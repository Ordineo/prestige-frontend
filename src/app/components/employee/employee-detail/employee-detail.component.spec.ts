import {EndorsementService} from '../../../services/endorsement.service';
import {ActivatedRoute} from '@angular/router';
import {EmployeeService} from '../../../services/employee.service';
import {EmployeeDetailComponent} from './employee-detail.component';
import {instance, mock, when} from 'ts-mockito';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

describe('EmployeeDetailComponent', () => {

  let componentUnderTest: EmployeeDetailComponent;

  let employeeService: EmployeeService, endorsementsService: EndorsementService, activatedRoute: ActivatedRoute;

  const username = 'username';
  const paramsSubject = new Subject();

  beforeEach(() => {

    employeeService = mock(EmployeeService);
    endorsementsService = mock(EndorsementService);
    activatedRoute = {
      params: paramsSubject.asObservable()
    } as ActivatedRoute;

    componentUnderTest = new EmployeeDetailComponent(activatedRoute, instance(employeeService), instance(endorsementsService));
  });

  describe('ngOnInit', () => {

    it('should get the current employee, grantedEndorsements and receivedEndorsements', () => {
      const userSubject = new Subject();
      const grantedSubject = new Subject();
      const receivedSubject = new Subject();

      when(employeeService.getByUsername(username)).thenReturn(userSubject.asObservable());
      when(endorsementsService.findByGranter(username)).thenReturn(grantedSubject.asObservable());
      when(endorsementsService.findByReceiver(username)).thenReturn(receivedSubject.asObservable());

      componentUnderTest.ngOnInit();
      paramsSubject.next({id: username});

      expect(componentUnderTest.employee).toEqual(jasmine.any(Observable));
      expect(componentUnderTest.grantedEndorsements).toEqual(jasmine.any(Observable));
      expect(componentUnderTest.receivedEndorsements).toEqual(jasmine.any(Observable));
    });
  });

});
