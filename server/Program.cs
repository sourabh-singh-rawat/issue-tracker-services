using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FirebaseAdmin;
using Data;
using Middlewares;
using Services;
using Data.Repositories;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.SwaggerDoc("v1", new OpenApiInfo
  {
    Version = "v1",
    Title = "Issue Tracker API",
    Description = "A .Net Core Api for issue tracker",
  });
});
builder.Services.AddHttpContextAccessor();

// Cors Policy
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(policy =>
  {
    policy.WithOrigins("http://localhost:3000")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
});

// Authenticaion
builder.Services.AddSingleton(FirebaseApp.Create());
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddScheme<AuthenticationSchemeOptions, FirebaseAuthHandler>(JwtBearerDefaults.AuthenticationScheme, (o) => { });

// Database Connection
builder.Services.AddDbContext<DatabaseContext>(options => options
  .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Automapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Services Injection
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IProjectStatusTypesService, ProjectStatusTypesService>();
builder.Services.AddScoped<IIssueStatusTypesService, IssueStatusTypesService>();
builder.Services.AddScoped<IIssuePriorityTypesService, IssuePriorityTypesService>();

// Repositories Injection
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectStatusTypesRepository, ProjectStatusTypesRepository>();
builder.Services.AddScoped<IIssueStatusTypesRepository, IssueStatusTypesRepository>();
builder.Services.AddScoped<IIssuePriorityTypesRepository, IssuePriorityTypesRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
