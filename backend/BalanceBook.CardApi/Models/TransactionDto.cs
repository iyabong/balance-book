namespace BalanceBook.CardApi.Models;

public record TransactionDto(
    Guid CardId,
    string Type,    // 'payment', 'charge'
    int Amount
);