using Microsoft.AspNetCore.Mvc;
using BalanceBook.Services;

namespace BalanceBook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoutineController : ControllerBase
    {
        private readonly IRoutineService _routineService;

        public RoutineController(IRoutineService routineService)
        {
            _routineService = routineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoutineCheckCalendar(
            [FromQuery] string startDate,
            [FromQuery] string endDate)
        {
            var start = DateTime.ParseExact(startDate, "yyyyMMdd", null);
            var end = DateTime.ParseExact(endDate, "yyyyMMdd", null);
            var routines = await _routineService.GetRoutineCheckCalendarAsync(start, end);
            return Ok(routines);
        }
    }
} 