import { PageInfo } from './pageinfo';

export class Page<T> implements Iterable<T> {

  public items: T[];
  public pageInfo: PageInfo;

  public static createPage<T>(items: T[], pageInfo: PageInfo): Page<T> {
    const result = new Page<T>();
    result.items = items;
    result.pageInfo = pageInfo;
    return result;
  }

  public isLastPage(): boolean {
    return this.pageInfo.isLastPage();
  }

  public isFirstPage(): boolean {
    return this.pageInfo.isFirstPage();
  }

  [Symbol.iterator]() {

    let pointer = 0;
    const items = this.items;

    return {
      next(): IteratorResult<T> {
        if (pointer < items.length) {
          return {
            value: items[pointer++],
            done: false
          } as IteratorResult<T>;
        } else {
          return {
            done: true
          } as IteratorResult<T>;
        }
      }
    }

  }

}
