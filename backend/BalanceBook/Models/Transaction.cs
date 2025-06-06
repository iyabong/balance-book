using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;
using System;

namespace BalanceBook.Models
{
    [Table("transactions")]
    public class Transaction : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("user_id")]
        public Guid? UserId { get; set; }

        [Column("type")]
        public string Type { get; set; } = "";

        [Column("amount")]
        public decimal Amount { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("card_id")]
        public Guid? CardId { get; set; }
    }
}
