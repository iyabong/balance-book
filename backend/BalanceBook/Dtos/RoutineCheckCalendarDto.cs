using System;
using System.Collections.Generic;
using BalanceBook.Models;

namespace BalanceBook.Dtos
{
    public record RoutineCheckDto(
        string TemplateId,
        string Status,
        DateTime CheckTime
    );

    public record RoutineCheckCalendarDto(
        DateTime Date,
        string DayOfWeek,
        IReadOnlyList<RoutineCheckDto> RoutineChecks
    );
} 