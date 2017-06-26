import { Component, Input, OnInit, Output } from '@angular/core';
import { PageInfo } from '../../../models/pageinfo';

@Component({
  selector: 'app-paging-controls',
  templateUrl: './paging-controls.component.html',
  styleUrls: ['./paging-controls.component.scss']
})
export class PagingControlsComponent implements OnInit {

  @Input()
  pageInfo: PageInfo;
  @Input()
  goToPage: (pageNumber: number) => void;

  public currentPage = 0;
  public currentPageSet = 0;
  public pageSets: Array<Array<number>>;
  public maxNumberOfPageButtons = 2;

  constructor() {
  }

  ngOnInit() {
    this.pageSets = [];
    const numberOfPageSets = this.pageInfo.totalPages / this.maxNumberOfPageButtons;
    for (let i = 0; i < numberOfPageSets; i++) {
      if (i < numberOfPageSets - 1) {
        this.pageSets[i] = new Array(this.maxNumberOfPageButtons).fill(true);
      } else {
        this.pageSets[i] = new Array(Math.ceil(this.pageInfo.totalElements / this.pageInfo.size % this.maxNumberOfPageButtons)).fill(true);
      }
    }
  }

  calculatePageNumberFromIndex(index: number) {
    return this.currentPageSet * this.maxNumberOfPageButtons + index;
  }

  previousPageEnabled(): boolean {
    return !this.pageInfo.isLastPage();
  }

  nextPageEnabled(): boolean {
    return !this.pageInfo.isFirstPage();
  }

  goToSpecificPage(pageIndex: number) {
    console.log(`Going to page ${pageIndex}`);
    console.log(`Going to pageSet ${Math.ceil(pageIndex / this.maxNumberOfPageButtons)}, calculating Math.ceil(${pageIndex} / ${this.maxNumberOfPageButtons})`);
    this.currentPage = pageIndex;
    this.currentPageSet = Math.ceil(((pageIndex + 1) / this.maxNumberOfPageButtons) - 1);
    this.goToPage(pageIndex);
  }

  nextPage() {
    if (this.currentPage < this.pageInfo.totalPages - 1) {
      this.goToSpecificPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.goToSpecificPage(this.currentPage - 1);
    }
  }

  previousPageSet() {
    if (this.currentPageSet > 0) {
      this.currentPageSet--;
    }
  }

  nextPageSet() {
    if (this.currentPageSet < this.pageSets.length - 1) {
      this.currentPageSet++;
    }
  }

}
