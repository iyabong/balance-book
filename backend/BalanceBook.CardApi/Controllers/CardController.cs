using Microsoft.AspNetCore.Mvc;

namespace BalanceBook.CardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("CardController is working!");
        }
    }
}