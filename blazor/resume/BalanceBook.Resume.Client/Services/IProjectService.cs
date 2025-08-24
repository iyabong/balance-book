using BalanceBook.Resume.Client.Models;

namespace BalanceBook.Resume.Client.Services;

public interface IProjectService
{
    Task<List<Project>> GetAllAsync();
    Task<Project?> GetAsync(Guid id);
    Task<Project> CreateAsync(Project item);
    Task<bool> UpdateAsync(Project item);
    Task<bool> DeleteAsync(Guid id);
}
