using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BalanceBook.Models
{
    [Table("TBL_CALENDAR_DATE")]
    public record CalendarDate
    {
        [Key]
        [Column("CALENDAR_DATE")]
        public DateTime CalDate { get; init; }

        [Column("DAY_OF_WEEK")]
        [StringLength(3)]
        public string DayOfWeek { get; init; }

    }
} 