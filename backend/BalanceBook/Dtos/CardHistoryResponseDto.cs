namespace BalanceBook.Dtos;

public class CardHistoryResponseDto
{
    public Guid Id { get; set; }

    public Guid? CardId { get; set; }

    public string Type { get; set; } = "";

    public decimal Amount { get; set; }

    public DateTime CreatedAt { get; set; }
}