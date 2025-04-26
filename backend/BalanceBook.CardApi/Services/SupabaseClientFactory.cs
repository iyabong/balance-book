using Supabase;
using Supabase.Interfaces;

public static class SupabaseClientFactory
{
    private static Supabase.Client? _client;

    public static async Task<Supabase.Client> GetClientAsync()
    {
        if (_client == null) 
        {
            var url = Environment.GetEnvironmentVariable("SUPABASE_URL")
                        ?? throw new InvalidOperationException("Supabase Url is missing!");

            var key = Environment.GetEnvironmentVariable("SUPABASE_KEY")
                        ?? throw new InvalidOperationException("Supabase Key is missing!");

            var options = new SupabaseOptions
            {
                AutoRefreshToken = true
            };

            _client = new Supabase.Client(url, key, options);
            await _client.InitializeAsync();
        }

        return _client;
    }
}