namespace Utils;

public class ListApiResponse<T>
{
  public int StatusCode { get; set; }
  public string ErrorMessage { get; set; } = string.Empty;
  public T? Rows { get; set; }
  public int RowCount { get; set; } = 0;
}