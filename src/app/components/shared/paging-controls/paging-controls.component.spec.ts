import { PagingControlsComponent } from './paging-controls.component';
import { PageInfo } from '../../../models/pageinfo';

describe('PagingControlsComponent', () => {

  let componentUnderTest: PagingControlsComponent;

  const size = 5;
  const totalElements = 68;
  const totalPages = 14;
  const number = 0;
  const pageInfo = PageInfo.createPageInfo({
    size, totalElements, totalPages, number
  });

  beforeEach(() => {
    componentUnderTest = new PagingControlsComponent();
    componentUnderTest.pageInfo = pageInfo;
    componentUnderTest.goToPage = () => {
    };
    spyOn(componentUnderTest, 'goToPage').and.callFake(() => {
    });
  });

  describe('ngOnInit', () => {

    it('should initialize the pagesets', () => {
      componentUnderTest.ngOnInit();

      expect(componentUnderTest.pageSets).toEqual([
        [true, true, true, true, true],
        [true, true, true, true, true],
        [true, true, true, true]
      ])
    });
  });

  describe('calculatePageNumberFromIndex', () => {

    it('should return currentPageSetIndex times maxNumberOfPageButtons + the index of the page in the pageSet', () => {
      componentUnderTest.currentPageSet = 0;
      expect(componentUnderTest.calculatePageNumberFromIndex(1)).toEqual(1)

      componentUnderTest.currentPageSet = 2;
      expect(componentUnderTest.calculatePageNumberFromIndex(2)).toEqual(12);
    });
  });

  describe('previousPageEnabled', () => {

    it('should return true if the currentPageIndex is higher than 0', () => {
      componentUnderTest.currentPage = 2;
      expect(componentUnderTest.previousPageEnabled()).toBeTruthy();
    });

    it('should return false if the currentPageIndex is 0', () => {
      componentUnderTest.currentPage = 0;
      expect(componentUnderTest.previousPageEnabled()).toBeFalsy();
    });
  });

  describe('nextPageEnabled', () => {

    it('should return true if the currentPageIndex is lower than last page index', () => {
      componentUnderTest.currentPage = 5;
      expect(componentUnderTest.nextPageEnabled()).toBeTruthy();
    });

    it('should return false if the currentPageIndex is 0', () => {
      componentUnderTest.currentPage = 13;
      expect(componentUnderTest.nextPageEnabled()).toBeFalsy();
    });

  });

  describe('goToSpecificPage', () => {

    it('sets currentpage to new index and calculates the new currentpagesetIndex and then calls the given goToPage function', () => {
      componentUnderTest.goToSpecificPage(2);

      expect(componentUnderTest.currentPage).toEqual(2);
      expect(componentUnderTest.currentPageSet).toEqual(0);
      expect(componentUnderTest.goToPage).toHaveBeenCalledWith(2);
    });

  });

  describe('goToSpecificPageSet', () => {

    it('sets currentpageset to new index and goes to first page of that set', () => {
      componentUnderTest.goToSpecificPageSet(1);

      expect(componentUnderTest.currentPageSet).toEqual(1);
      expect(componentUnderTest.currentPage).toEqual(5);
      expect(componentUnderTest.goToPage).toHaveBeenCalledWith(5);
    });

  });

  describe('pages', () => {

    beforeEach(() => {
      componentUnderTest.ngOnInit();
    });

    describe('nextPage', () => {

      it('if currentPage is not last page, go to next page', () => {
        componentUnderTest.currentPage = 2;
        componentUnderTest.nextPage();

        expect(componentUnderTest.currentPage).toEqual(3);
        expect(componentUnderTest.currentPageSet).toEqual(0);
        expect(componentUnderTest.goToPage).toHaveBeenCalledWith(3);
      });

      it('if currentPage is last page, does nothing', () => {
        componentUnderTest.currentPage = 13;
        componentUnderTest.nextPage();

        expect(componentUnderTest.currentPage).toEqual(13);
        expect(componentUnderTest.goToPage).not.toHaveBeenCalled();
      });
    });

    describe('previousPage', () => {

      it('if currentPage is not first page, go to previous page', () => {
        componentUnderTest.currentPage = 2;
        componentUnderTest.previousPage();

        expect(componentUnderTest.currentPage).toEqual(1);
        expect(componentUnderTest.currentPageSet).toEqual(0);
        expect(componentUnderTest.goToPage).toHaveBeenCalledWith(1);
      });

      it('if currentPage is first page, does nothing', () => {
        componentUnderTest.currentPage = 0;
        componentUnderTest.previousPage();

        expect(componentUnderTest.currentPage).toEqual(0);
        expect(componentUnderTest.goToPage).not.toHaveBeenCalled();
      });

    });
  });

  describe('pageSets', () => {

    beforeEach(() => {
      componentUnderTest.ngOnInit();
    });

    describe('nextPageSet', () => {

      it('if currentPageSet is not last page, go to next pageSet', () => {
        componentUnderTest.currentPageSet = 1;
        componentUnderTest.nextPageSet();

        expect(componentUnderTest.currentPageSet).toEqual(2);
        expect(componentUnderTest.currentPage).toEqual(10);
        expect(componentUnderTest.goToPage).toHaveBeenCalledWith(10);
      });

      it('if currentPageSet is last page, does nothing', () => {
        componentUnderTest.currentPageSet = 2;
        componentUnderTest.nextPageSet();

        expect(componentUnderTest.currentPageSet).toEqual(2);
        expect(componentUnderTest.goToPage).not.toHaveBeenCalled();
      });

    });

    describe('previousPageSet', () => {

      it('if currentPageSet is not first page, go to previous pageSet', () => {
        componentUnderTest.currentPageSet = 1;
        componentUnderTest.previousPageSet();

        expect(componentUnderTest.currentPageSet).toEqual(0);
        expect(componentUnderTest.currentPage).toEqual(0);
        expect(componentUnderTest.goToPage).toHaveBeenCalledWith(0);
      });

      it('if currentPageSet is first page, does nothing', () => {
        componentUnderTest.currentPageSet = 0;
        componentUnderTest.previousPageSet();

        expect(componentUnderTest.currentPageSet).toEqual(0);
        expect(componentUnderTest.goToPage).not.toHaveBeenCalled();
      });
    });
  })

});
