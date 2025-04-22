using BalanceBook.CardApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 포트 설정 (Render 대비)
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://*:{port}");

// 서비스 등록
builder.Services.AddScoped<ICardService, CardService>();

// 📦 API 기본 서비스 추가
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// HTTP 설정
app.UseHttpsRedirection();
app.UseAuthentication();

// API 라우팅
app.MapControllers();

app.Run();

