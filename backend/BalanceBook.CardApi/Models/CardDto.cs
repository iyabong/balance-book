namespace BalanceBook.CardApi.Models;

public record CardDto(
    Guid Id,
    string CardNo,
    string UserId,
    string Name,
    int Balance     // 계산된 필드
);