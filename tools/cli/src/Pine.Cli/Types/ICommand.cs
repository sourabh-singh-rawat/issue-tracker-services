namespace Cli.Types;

public interface ICommand
{
    Task<int> ExecuteAsync();
}