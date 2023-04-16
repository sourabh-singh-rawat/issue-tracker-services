using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using FirebaseAdmin;
using FirebaseAdmin.Auth;

namespace Middlewares;

public class FirebaseAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
  private readonly FirebaseApp _firebaseApp;

  public FirebaseAuthHandler(
    FirebaseApp firebaseApp,
    IOptionsMonitor<AuthenticationSchemeOptions> options,
    ILoggerFactory logger,
    UrlEncoder encoder,
    ISystemClock clock
  )
  : base(options, logger, encoder, clock)
  {
    _firebaseApp = firebaseApp;
  }

  protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
  {
    try
    {
      var authHeader = Request.Headers["Authorization"].FirstOrDefault();
      if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
      {
        return AuthenticateResult.Fail("Invalid Authorization header.");
      }

      string bearerToken = authHeader.Substring("Bearer ".Length);
      var decodedToken = await FirebaseAuth.GetAuth(_firebaseApp).VerifyIdTokenAsync(bearerToken);
      var claims = new List<Claim>
      {
        new Claim(ClaimTypes.NameIdentifier, decodedToken.Uid),
        // new Claim(ClaimTypes.Email, decodedToken.Email)
      };


      var identity = new ClaimsIdentity(claims, Scheme.Name);
      var principal = new ClaimsPrincipal(identity);
      var ticket = new AuthenticationTicket(principal, Scheme.Name);

      return AuthenticateResult.Success(ticket);
    }
    catch (Exception ex)
    {
      return AuthenticateResult.Fail("Failed to Authenticate: " + ex.Message);
    }
  }
}