namespace Utils;

public class RepositoryResponse<T>
{
  public bool Success { get; set; } = false;
  public T? Data { get; set; }
  public string? ErrorMessage { get; set; } = String.Empty;
}