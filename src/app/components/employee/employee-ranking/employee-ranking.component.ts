import { Account } from '../../../models/account';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Page } from '../../../models/page';

@Component({
  selector: 'app-employee-ranking',
  templateUrl: './employee-ranking.component.html',
  styleUrls: ['./employee-ranking.component.scss']
})
export class EmployeeRankingComponent implements OnInit {

  currentPage = 0;
  readonly itemsPerPage = 20;
  employeesPage: Page<Account>;
  nextPageEnabled: boolean;
  previousPageEnabled: boolean;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.loadEmployeesPage();
  }

  nextPage() {
    if (this.nextPageEnabled) {
      this.currentPage++;
      this.loadEmployeesPage();
    }
  }

  previousPage() {
    if (this.previousPageEnabled) {
      this.currentPage--;
      this.loadEmployeesPage();
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex < this.employeesPage.pageInfo.totalPages) {
      this.currentPage = pageIndex;
      this.loadEmployeesPage();
    }
  }

  private loadEmployeesPage(): void {
    this.employeeService
      .getAllEmployees(this.currentPage, this.itemsPerPage)
      .subscribe((page: Page<Account>) => {
        this.employeesPage = page;
        this.nextPageEnabled = !this.employeesPage.isLastPage();
        this.previousPageEnabled = !this.employeesPage.isFirstPage();
      });
  }

}
