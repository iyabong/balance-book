using BalanceBook.CardApi.Models;

namespace BalanceBook.CardApi.Services;

public interface ICardService
{
    Task<IEnumerable<CardResponseDto>> GetAllAsync();
}