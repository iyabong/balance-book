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
        public DbSet<UserRoutine> UserRoutines { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
} 