import { PageInfo } from './pageinfo';

export class Page<T> implements Iterable<T> {

  public pageInfo: PageInfo;
  public items: T[];

  public static createPage<T>(items: T[], pageInfo: PageInfo): Page<T> {
    const result = new Page<T>();
    result.items = items;
    result.pageInfo = pageInfo;
    return result;
  }

  [Symbol.iterator](): Iterator<T> {

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
