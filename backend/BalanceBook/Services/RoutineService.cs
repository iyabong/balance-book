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

        public async Task<IEnumerable<RoutineCheckCalendarDto>> GetRoutineCheckCalendarAsync(DateTime startDate, DateTime endDate, String userId)
        {

            Console.Write("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            // 1. 사용자 ID로 템플릿 ID 목록 가져오기
            var templateIds = await _context.UserRoutines
                .Where(ur => ur.UserId == userId && ur.IsUsable == "T")
                .Select(ur => ur.TemplateId)
                .ToListAsync();
            Console.Write("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
            // 2. 해당 템플릿의 루틴 체크들 먼저 DB에서 모두 가져오기
            var routineChecks = await _context.RoutineChecks
                .Where(rc => templateIds.Contains(rc.TemplateId) && rc.CheckTime != null)
                .ToListAsync();                                    

            Console.Write("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
            // 3. 달력 날짜도 미리 DB에서 가져오기
            var calendarDates = await _context.CalendarDates
                .Where(cd => cd.CalDate >= startDate && cd.CalDate <= endDate)
                .OrderBy(cd => cd.CalDate)
                .ToListAsync();

            var result = calendarDates
                .GroupJoin(
                    routineChecks,
                    cd => cd.CalDate.Date,
                    rc => rc.CheckTime.Date,  // 메모리에서 수행되므로 .Date 사용 가능
                    (cd, rcGroup) => new RoutineCheckCalendarDto(
                            cd.CalDate,
                            cd.DayOfWeek,
                            rcGroup.Select(rc => new RoutineCheckDto(
                                rc.TemplateId,
                                rc.Status,
                                rc.CheckTime.Date
                            )).ToList()
                         )
                ).ToList();

            return result;
        }
    }
} 