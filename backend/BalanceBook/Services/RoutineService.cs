using Microsoft.EntityFrameworkCore;
using BalanceBook.Data.Context;
using BalanceBook.Dtos;
using Oracle.ManagedDataAccess.Client;

namespace BalanceBook.Services
{
    public class RoutineService : IRoutineService
    {
        private readonly BalanceBookContext _context;

        public RoutineService(BalanceBookContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoutineCheckCalendarDto>> GetRoutineCheckCalendarAsync(DateTime startDate, DateTime endDate)
        {

            var result = await _context.CalendarDates
                .Where(c => c.Date >= startDate && c.Date <= endDate)
                .GroupJoin(
                    _context.RoutineChecks,
                    calendar => calendar.Date,
                    routine => routine.CheckTime.Value.Date,
                    (calendar, routines) => new RoutineCheckCalendarDto(
                        calendar.Date,
                        calendar.DayOfWeek,
                        routines.ToList()
                    ))
                .ToListAsync();

            return result;
        }
    }
} 