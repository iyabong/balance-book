using Microsoft.EntityFrameworkCore;
using BalanceBook.Models;

namespace BalanceBook.Data.Context
{
    public class BalanceBookContext : DbContext
    {
        public BalanceBookContext(DbContextOptions<BalanceBookContext> options)
            : base(options)
        {
        }

        public DbSet<CalendarDate> CalendarDates { get; set; }
        public DbSet<RoutineCheck> RoutineChecks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // CalendarDate와 RoutineCheck 간의 관계 설정
            modelBuilder.Entity<CalendarDate>()
                .HasMany(c => c.RoutineChecks)
                .WithOne()
                .HasForeignKey("CALENDAR_DATE")
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
} 