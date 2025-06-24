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

            [HttpGet("calendar")]
            public async Task<IActionResult> GetRoutineCheckCalendar(
                [FromQuery] string startDate,
                [FromQuery] string endDate
            )
            {
            // 날짜 문자열(YYYYMMDD)을 DateTime으로 파싱
                var start = DateTime.ParseExact(startDate, "yyyyMMdd", null);
                var end = DateTime.ParseExact(endDate, "yyyyMMdd", null);

                // 고정된 사용자 ID (공통 루틴 템플릿 사용)
                var defaultUserId = "DEFAULT";            
                var rcCalendar = await _routineService.GetRoutineCheckCalendarAsync(start, end, defaultUserId);
                return Ok(rcCalendar);
            }
        }
    } 