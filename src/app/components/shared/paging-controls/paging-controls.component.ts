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
  public goToPage: (pageNumber: number) => void;

  public currentPage = 0;
  public currentPageSet = 0;
  public pageSets: Array<Array<boolean>>;
  public readonly maxNumberOfPageButtons = 5;

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
    return this.currentPage !== 0;
  }

  nextPageEnabled(): boolean {
    return this.currentPage < this.pageInfo.totalPages - 1;
  }

  goToSpecificPage(pageIndex: number) {
    this.currentPage = pageIndex;
    this.currentPageSet = Math.abs(Math.ceil(((pageIndex + 1) / this.maxNumberOfPageButtons) - 1));
    this.goToPage(pageIndex);
  }

  goToSpecificPageSet(pageSetIndex: number) {
    this.currentPageSet = pageSetIndex;
    this.goToSpecificPage(this.maxNumberOfPageButtons * pageSetIndex);
  }

  nextPage() {
    if (this.currentPage < this.pageInfo.totalPages - 1) {
      this.goToSpecificPage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.goToSpecificPage(this.currentPage -  1);
    }
  }

  previousPageSet() {
    if (this.currentPageSet > 0) {
      this.goToSpecificPageSet(this.currentPageSet - 1);
    }
  }

  nextPageSet() {
    if (this.currentPageSet < this.pageSets.length - 1) {
      this.goToSpecificPageSet(this.currentPageSet + 1);
    }
  }

}
