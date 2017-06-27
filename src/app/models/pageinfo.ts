export class PageInfo {

  public size: number;
  public totalElements: number;
  public totalPages: number;
  public number: number;

  public static createPageInfo(pageInfo: { size: number, totalElements: number, totalPages: number, number: number }): PageInfo {
    const result = new PageInfo();
    result.size = pageInfo.size;
    result.totalElements = pageInfo.totalElements;
    result.totalPages = pageInfo.totalPages;
    result.number = pageInfo.number;
    return result;
  }

}
