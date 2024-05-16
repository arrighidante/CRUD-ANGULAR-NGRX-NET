using Products.API;
using Products.API.DbContexts;
using Products.API.Services;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Sentry.Extensibility;
using Serilog;
using Serilog.Events;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Options;
using Products.API.Filters;


//Log.Logger = new LoggerConfiguration()
//    .WriteTo.Sentry(o =>
//    {
//        o.Dsn = "https://bf3cfd799e334e6d9da42e9017bd9495@o4504963706322944.ingest.sentry.io/4505466241155072";
//        o.Debug = true;
//        o.TracesSampleRate = 1;
//        o.MinimumBreadcrumbLevel = LogEventLevel.Debug;
//        o.MinimumEventLevel = LogEventLevel.Warning;
//    })
//    .CreateLogger();


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/productInfoLog.txt", rollingInterval: RollingInterval.Day)
    .WriteTo.Sentry(o =>
    {
        o.Dsn = "https://bf3cfd799e334e6d9da42e9017bd9495@o4504963706322944.ingest.sentry.io/4505466241155072";
        o.Debug = true;
        o.TracesSampleRate = 1;
        o.MinimumBreadcrumbLevel = LogEventLevel.Debug;
        o.MinimumEventLevel = LogEventLevel.Warning;
    })
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("UnsafeAllowAll", builder =>
                     builder.AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());

    options.AddPolicy("AllowSpecificOrigins",
            builder =>
            {
                builder.WithOrigins("http://localhost",
                                    "http://localhost:8100")
                .AllowAnyMethod()
                .AllowAnyHeader();
            });
});




builder.WebHost.UseSentry();

// Not useful anymore since we're using Serilog
//builder.Logging.ClearProviders();
//builder.Logging.AddConsole();

builder.Host.UseSerilog();


// Add services to the container.

builder.Services.AddControllers( options =>
{
    options.ReturnHttpNotAcceptable = true;
}).AddNewtonsoftJson()
    .AddXmlDataContractSerializerFormatters();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setupAction =>
{
    var xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlCommentsFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);

    setupAction.IncludeXmlComments(xmlCommentsFullPath);

    setupAction.AddSecurityDefinition("ProductInfoApiBearerAuth", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
    {
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        Description = "Input a valid token to access this API"
    });

    setupAction.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id ="ProductInfoApiBearerAuth" }
                }, new List<string>() }

    });

    setupAction.SwaggerDoc("v1", new OpenApiInfo { Title = "ProductInfo API", Version = "v1" });
    
    // To show enums as strings in Swagger
    setupAction.SchemaFilter<EnumSchemaFilter>();
});

builder.Services.AddSingleton<FileExtensionContentTypeProvider>();

/*
  Comments for builder.Services
    - AddTransient -> Created each time they're requested. 
                      Best for lighweight, stateless services.
    - AddScoped -> Created once per request
    - AddSingleton -> Created the first time they're requested.
 */

// MAIL SERVICE
#if DEBUG
builder.Services.AddTransient<IMailService, LocalMailService>();
#else
builder.Services.AddTransient<IMailService, CloudMailService>();
#endif


//builder.Services.AddSingleton<ProductsDataStore>();
builder.Services.AddDbContext<ProductInfoContext>(
    dbContextOptions => dbContextOptions.UseMySQL(builder.Configuration["ConnectionStrings:DefaultDevConnection"]));

builder.Services.AddScoped<IProductInfoRepository, ProductInfoRepository>();

// To map between entities and different DTOs
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Authentication:Issuer"],
            ValidAudience = builder.Configuration["Authentication:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(builder.Configuration["Authentication:SecretForKey"]))
        };
    }
);


// POLICIES
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("MustBeFromRosario", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("city", "Rosario");
    });
});



// API VERSIONING
builder.Services.AddApiVersioning(setupAction =>
{
    setupAction.AssumeDefaultVersionWhenUnspecified = true;
    setupAction.DefaultApiVersion = new Microsoft.AspNetCore.Mvc.ApiVersion(1, 0);
    setupAction.ReportApiVersions = true;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("AllowSpecificOrigins");

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseSentryTracing();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});


app.Run();
