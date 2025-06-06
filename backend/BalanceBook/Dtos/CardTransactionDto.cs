namespace BalanceBook.Dtos;

public class CardTransactionDto
{
    public Guid Id { get; set; }

    public Guid? CardId { get; set; }

    public string Type { get; set; } = "";

    public decimal Amount { get; set; }
}