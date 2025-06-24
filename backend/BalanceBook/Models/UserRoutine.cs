using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BalanceBook.Models
{
    [Table("TBL_USER_ROUTINE")]
    public class UserRoutine
    {
        [Key]
        [Column("ID")]
        [StringLength(20)]
        public string Id { get; set; }

        [Required]
        [Column("USER_ID")]
        [StringLength(36)]
        public string UserId { get; set; }

        [Required]
        [Column("TEMPLATE_ID")]
        [StringLength(10)]
        public string TemplateId { get; set; }

        [Required]
        [Column("IS_USABLE")]
        [StringLength(1)]
        public string IsUsable { get; set; }  // 'T' or 'F'

        [Required]
        [Column("START_DATE")]
        public DateTime StartDate { get; set; }
    }
}