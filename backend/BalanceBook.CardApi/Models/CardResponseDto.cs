namespace BalanceBook.CardApi.Models;

public class CardResponseDto
{
    public Guid Id { get; set; }
    public string CardNo { get; set; } = "";
    public string Name { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public decimal Balance { get; set; }    
}
