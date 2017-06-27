import { EmployeeService } from '../../../services/employee.service';
import { anyNumber, instance, mock, verify, when } from 'ts-mockito';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { EmployeeRankingComponent } from './employee-ranking.component';
import { Page } from '../../../models/page';
import { Account } from '../../../models/account';
import { PageInfo } from '../../../models/pageinfo';

describe('EmployeeRankingComponent', () => {

  let componentUnderTest: EmployeeRankingComponent;

  let employeeService: EmployeeService;
  const employees = [new Account(), new Account()];

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    componentUnderTest = new EmployeeRankingComponent(instance(employeeService));
  });

  describe('ngOnInit', () => {

    it('should load page zero of the employees', () => {
      const employeesPage = Page.createPage(employees, PageInfo.createPageInfo({
        number: 0,
        size: 20,
        totalPages: 4,
        totalElements: 68
      }));

      when(employeeService.getEmployees(0, 20)).thenReturn(Observable.of(employeesPage));

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.employeesPage).toEqual(employeesPage);
    });
  });

  describe('goToPage', () => {

    it('if pageIndex is lower than maximum amount of pages - 1, call employeeService', () => {
      when(employeeService.getEmployees(anyNumber(), anyNumber())).thenReturn(Observable.empty());
      componentUnderTest.employeesPage =
        Page
          .createPage(
            employees,
            PageInfo.createPageInfo({
              size: 20,
              totalElements: 68,
              number: 0,
              totalPages: 4
            }));

      componentUnderTest.goToPage(2);

      verify(employeeService.getEmployees(2, 20)).once();
    });
  });

});
