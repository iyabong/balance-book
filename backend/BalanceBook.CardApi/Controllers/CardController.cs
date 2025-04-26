using Microsoft.AspNetCore.Mvc;
using BalanceBook.CardApi.Services;
using BalanceBook.CardApi.Models;

namespace BalanceBook.CardApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly ICardService _cardService;

        public CardController(ICardService cardService)
        {
            _cardService = cardService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardResponseDto>>> Get()
        {
            var cards = await _cardService.GetAllAsync();
            return Ok(cards);
        }
    }
}