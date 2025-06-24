using BalanceBook.Dtos;

namespace BalanceBook.Services
{
    public interface IRoutineService
    {
        Task<IEnumerable<RoutineCheckCalendarDto>> GetRoutineCheckCalendarAsync(DateTime startDate, DateTime endDate, String userId);
    }
} 