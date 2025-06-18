using BalanceBook.Data.Context;
using BalanceBook.Services;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var Wdir = builder.Configuration["Oracle:Wdir"];

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 포트 설정 (Render 대비)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://*:{port}");

// 서비스 등록
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IRoutineService, RoutineService>();

// ✅ Oracle Wallet 위치 지정 (최상단)
OracleConfiguration.TnsAdmin = Wdir;
OracleConfiguration.WalletLocation = OracleConfiguration.TnsAdmin;

// // ✅ EF Core에 Oracle 연결 등록
builder.Services.AddDbContext<BalanceBookContext>(options =>
    options.UseOracle(connectionString));

using (OracleConnection con = new OracleConnection(connectionString))
{
    using (OracleCommand cmd = con.CreateCommand())
    {
        try
        {
            con.Open();
            Console.WriteLine("Successfully connected to Oracle Autonomous Database");
            Console.WriteLine();

            cmd.CommandText = "select NAME FROM CAR";
            OracleDataReader reader = cmd.ExecuteReader();
            while (reader.Read())
                Console.WriteLine(reader.GetString(0));
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }
}

// 📦 API 기본 서비스 추가
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000"
                              ,"https://balance-book.vercel.app")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTP 설정
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();

// API 라우팅
app.MapControllers();

app.Run();

