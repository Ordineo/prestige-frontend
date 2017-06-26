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

  public isLastPage(): boolean {
    return this.totalPages === this.number + 1;
  }

  public isFirstPage(): boolean {
    return this.number === 0;
  }

}
