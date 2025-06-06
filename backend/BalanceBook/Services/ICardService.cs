using BalanceBook.Dtos;

namespace BalanceBook.Services;

public interface ICardService
{
    Task<IEnumerable<CardResponseDto>> GetAllAsync();
    Task<IEnumerable<CardHistoryResponseDto>> GetCardHistoriesAsync(Guid cardId);
    Task<CardResponseDto> ProcessTransactionAsync(CardTransactionDto request);
}