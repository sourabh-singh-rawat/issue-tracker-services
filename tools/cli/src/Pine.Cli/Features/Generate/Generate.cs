using System.Diagnostics;
using Cli.Types;

namespace Cli.Features.Generate;

public class Generate : ICommand
{
    public async Task<int> ExecuteAsync()
    {
        var cwd = Directory.GetCurrentDirectory();
        var path = Path.Combine(cwd, ".env.example");
        // var file = await File.ReadAllBytesAsync(path);
        Debug.WriteLine(path);

        return 0;
    }
}