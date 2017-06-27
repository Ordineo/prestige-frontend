import { Account } from '../../../models/account';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Page } from '../../../models/page';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-employee-ranking',
  templateUrl: './employee-ranking.component.html',
  styleUrls: ['./employee-ranking.component.scss']
})
export class EmployeeRankingComponent implements OnInit {

  readonly itemsPerPage = 20;
  employeesPage: Page<Account>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.loadEmployeesPage(0);
  }

  goToPage(pageIndex: number) {
    if (this.employeesPage && pageIndex < this.employeesPage.pageInfo.totalPages) {
      this.loadEmployeesPage(pageIndex);
    }
  }

  private loadEmployeesPage(pageIndex: number): void {
    this.employeeService
      .getEmployees(pageIndex, this.itemsPerPage)
      .subscribe((employeesPage: Page<Account>) => {
        this.employeesPage = employeesPage;
      });
  }

}
