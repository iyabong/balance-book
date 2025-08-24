using BalanceBook.Resume.Client.Models;

namespace BalanceBook.Resume.Client.Services;

public class InMemoryProjectService : IProjectService
{
    private readonly List<Project> _items = new()
    {
        new Project {
            Name = "Resume MVP",
            Role = "개발자",
            Company = "BalanceBook Inc.",
            Client = "Internal",
            StartDate = DateTime.Today.AddDays(-7),
            EndDate = null
        }
    };
    public Task<List<Project>> GetAllAsync()
        => Task.FromResult(_items.OrderByDescending(x => x.StartDate).ToList());

    public Task<Project?> GetAsync(Guid id)
        => Task.FromResult(_items.FirstOrDefault(i => i.Id == id));
    public Task<Project> CreateAsync(Project item)
    {
        if (item.Id == Guid.Empty)
        {
            item.Id = Guid.NewGuid();
        }

        _items.Add(item);
        return Task.FromResult(item);   
    }
    public Task<bool> UpdateAsync(Project item)
    {
        var idx = _items.FindIndex(x => x.Id == item.Id);
        if (idx < 0)
        {
            return Task.FromResult(false);
        }

        _items[idx] = item;
        return Task.FromResult(true);
    }
    public Task<bool> DeleteAsync(Guid id)
        => Task.FromResult(_items.RemoveAll(x => x.Id == id) > 0);
}
