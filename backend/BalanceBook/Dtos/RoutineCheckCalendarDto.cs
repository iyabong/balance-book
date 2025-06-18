using System;
using System.Collections.Generic;
using BalanceBook.Models;

namespace BalanceBook.Dtos
{
    public record RoutineCheckCalendarDto(
        DateTime Date,
        string DayOfWeek,
        IReadOnlyList<RoutineCheck> RoutineChecks
    );
} 