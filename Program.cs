var builder = WebApplication.CreateBuilder(args);

// 1. Add CORS policy so your frontend can communicate with the backend


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 2. Enable the CORS policy before authorization


app.UseAuthorization();

// 3. Map your controllers so the ReviewController works
app.MapControllers();

// (Optional) You can remove the default WeatherForecast code below if you are strictly using your Review API

app.Run();