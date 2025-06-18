using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace BalanceBook.Models
{
    [Table("TBL_CALENDAR_DATE")]
    public record CalendarDate
    {
        [Key]
        [Column("CALENDAR_DATE")]
        public DateTime Date { get; init; }

        [Column("DAY_OF_WEEK")]
        [StringLength(3)]
        public string DayOfWeek { get; init; }

        // Navigation property
        public virtual ICollection<RoutineCheck> RoutineChecks { get; init; }
    }
} 