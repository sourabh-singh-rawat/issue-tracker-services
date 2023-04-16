namespace Utils;

public class ServiceResponse<T>
{
  public bool Success { get; set; } = false;
  public string? ErrorMessage { get; set; } = string.Empty;
  public T? Data { get; set; }
}