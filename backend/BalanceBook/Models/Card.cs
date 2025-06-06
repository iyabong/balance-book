using Supabase.Postgrest.Models;
using Supabase.Postgrest.Attributes;

namespace BalanceBook.Models
{
    [Table("cards")]
    public class Card : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; }

        [Column("card_no")]
        public string CardNo { get; set; } = "";

        [Column("user_id")]
        public Guid? UserId { get; set; }

        [Column("name")]
        public string Name { get; set; } = "";

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        public decimal Balance { get; set; }
    }
}
