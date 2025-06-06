using Microsoft.AspNetCore.Mvc;

namespace BalanceBook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SystemController : ControllerBase
    {
        [HttpGet("health")]
        public Task<IActionResult> Health() => Task.FromResult<IActionResult>(Ok("Healthy"));        
    }
}