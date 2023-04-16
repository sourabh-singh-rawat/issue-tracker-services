namespace Utils;

public class ApiResponse<T>
{
  public int StatusCode { get; set; } = 0;
  public string ErrorMessage { get; set; } = string.Empty;
  public T? Data { get; set; } = default;
}