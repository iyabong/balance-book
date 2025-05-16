using BalanceBook.CardApi.Dtos;

namespace BalanceBook.CardApi.Services;

public interface ICardService
{
    Task<IEnumerable<CardResponseDto>> GetAllAsync();
    Task<CardResponseDto> ProcessTransactionAsync(CardTransactionDto request);
}