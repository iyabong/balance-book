using Microsoft.AspNetCore.Mvc;
using BalanceBook.Services;
using BalanceBook.Dtos;

namespace BalanceBook.Controllers
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

        [HttpGet("history/{cardId}")] 
        public async Task<ActionResult<IEnumerable<CardHistoryResponseDto>>> GetCardHistories(Guid cardId)
        {
            var histories = await _cardService.GetCardHistoriesAsync(cardId);
            return Ok(histories);
        }        

        [HttpPost("transaction")]
        public async Task<ActionResult> ProcessTransaction([FromBody] CardTransactionDto request)
        {
            try
            {
                var updatedCard = await _cardService.ProcessTransactionAsync(request);
                return Ok(updatedCard);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}