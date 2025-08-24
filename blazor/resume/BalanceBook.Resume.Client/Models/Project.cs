using System.ComponentModel.DataAnnotations;

namespace BalanceBook.Resume.Client.Models;

public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";           // 프로젝트명
    public string Client { get; set; } = "";         // 고객사
    public string Company { get; set; } = "";        // 소속회사
    public string Role { get; set; } = "";           // 역할
    public string Description { get; set; } = "";    // 주요 업무
    public DateTime StartDate { get; set; } = DateTime.Today;
    public DateTime? EndDate { get; set; }
}
