using BalanceBook.Data.Context;
using BalanceBook.Services;
using Microsoft.EntityFrameworkCore;
using Oracle.ManagedDataAccess.Client;

var builder = WebApplication.CreateBuilder(args);
var user = Environment.GetEnvironmentVariable("DBS");
var pw = Environment.GetEnvironmentVariable("DBP");
var dataSource = builder.Configuration.GetConnectionString("dataSource");
var connectionString = $"User Id={user};Password={pw};Data Source={dataSource};Connection Timeout=30;";

// 포트 설정
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://*:{port}");
builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IRoutineService, RoutineService>();

// // ✅ EF Core에 Oracle 연결 등록 & // ✅ Oracle Wallet 위치 지정
builder.Services.AddDbContext<BalanceBookContext>(options => options.UseOracle(connectionString));
OracleConfiguration.TnsAdmin = builder.Configuration["Oracle:Wdir"];
OracleConfiguration.WalletLocation = OracleConfiguration.TnsAdmin;

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

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// 📦 API 기본 서비스 추가
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy
                .SetIsOriginAllowed(origin =>
                    origin == "http://localhost:3000"
                    || origin == "https://balance-book.vercel.app"          // prod
                    || origin == "https://dev-balance-book.vercel.app"      // ✅ dev 고정 도메인 추가
                    || origin.EndsWith("-iyabongs-projects.vercel.app")     // ✅ 프리뷰 해시 도메인 패턴 수정
                )
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

