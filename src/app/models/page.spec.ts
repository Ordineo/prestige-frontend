import { Page } from './page';
import { PageInfo } from './pageinfo';
describe('Page', () => {

  describe('iterator', () => {

    it('can loop over items in the page', () => {
      const items = ['Item1', 'item2', 'item3'];
      const page: Page<string> = Page.createPage(items, PageInfo.createPageInfo({
        size: 0,
        number: 0,
        totalPages: 0,
        totalElements: 0
      }));

      const iterator: Iterator<string> = page[Symbol.iterator]();
      let actual: IteratorResult<string> = iterator.next();
      expect(actual.value).toEqual('Item1');
      expect(actual.done).toBeFalsy();
      actual = iterator.next();
      expect(actual.value).toEqual('item2');
      expect(actual.done).toBeFalsy();
      actual = iterator.next();
      expect(actual.value).toEqual('item3');
      expect(actual.done).toBeFalsy();
      actual = iterator.next();
      expect(actual.value).toBeUndefined();
      expect(actual.done).toBeTruthy();
      actual = iterator.next();
      expect(actual.value).toBeUndefined();
      expect(actual.done).toBeTruthy();
    });

  });

});
