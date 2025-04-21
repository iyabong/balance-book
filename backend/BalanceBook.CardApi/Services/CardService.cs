using BalanceBook.CardApi.Models;

namespace BalanceBook.CardApi.Services;

public class CardService : ICardService
{
    private readonly List<CardDto> _cards = new()
    {
        new CardDto(Guid.NewGuid(), "1234", "user-1", "카드 A", 0),
        new CardDto(Guid.NewGuid(), "5678", "user-2", "카드 B", 0)
    };
     
    private readonly List<TransactionDto> _transactions = new()
    {
        new TransactionDto(Guid.Empty, "charge", 10000),
        new TransactionDto(Guid.Empty, "payment", 10000),
        new TransactionDto(Guid.Empty, "charge", 10000),
    };

    public Task<IEnumerable<CardDto>> GetAllAsync()
    {
        var result = _cards.Select(card =>
        {
            var balance = _transactions
                            .Where(t => t.CardId == card.Id)
                            .Sum(t => t.Type == "payment" ? -t.Amount : t.Amount);
            return card with { Balance = balance};
        });

        return Task.FromResult(result);
    }
}