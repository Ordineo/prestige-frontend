import {EmployeeService} from '../../../services/employee.service';
import {instance, mock, when} from 'ts-mockito';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {EmployeeRankingComponent} from './employee-ranking.component';

describe('EmployeeRankingComponent', () => {

  let componentUnderTest: EmployeeRankingComponent;

  let employeeService: EmployeeService;

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    componentUnderTest = new EmployeeRankingComponent(instance(employeeService));
  });

  describe('ngOnInit', () => {

    it('should get all employees', () => {
      const employeesSubject = new Subject();

      when(employeeService.getAllEmployees()).thenReturn(employeesSubject.asObservable());

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.employees).toEqual(jasmine.any(Observable));
    });
  });

});
