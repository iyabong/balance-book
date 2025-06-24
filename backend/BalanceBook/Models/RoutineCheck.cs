using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BalanceBook.Models
{
    [Table("TBL_ROUTINE_CHECK")]
    public class RoutineCheck
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Column("CHECK_TIME")]
        public DateTime CheckTime { get; set; }

        [Required]
        [Column("TEMPLATE_ID")]
        [StringLength(10)]
        public string? TemplateId { get; set; }

        [Column("TEMPLATE_TYPE")]
        [StringLength(20)]
        public string? TemplateType { get; set; }

        [Column("STATUS")]
        [StringLength(20)]
        public string? Status { get; set; }

        [Column("REMARK")]
        [StringLength(400)]
        public string? Remark { get; set; }

        [Column("CREATED_AT")]
        public DateTime? CreatedAt { get; set; }

        [Column("CREATED_BY")]
        [StringLength(36)]
        public string? CreatedBy { get; set; }

        [Column("UPDATED_AT")]
        public DateTime? UpdatedAt { get; set; }

        [Column("UPDATED_BY")]
        [StringLength(36)]
        public string? UpdatedBy { get; set; }
    }
}
