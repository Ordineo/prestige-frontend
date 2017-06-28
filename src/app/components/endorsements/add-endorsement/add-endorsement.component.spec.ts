import { EmployeeService } from '../../../services/employee.service';
import { instance, mock, verify, when } from 'ts-mockito';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AddEndorsementComponent } from './add-endorsement.component';
import { MdDialogRef } from '@angular/material';
import { EndorsementService } from '../../../services/endorsement.service';
import { CategoryService } from '../../../services/category.service';
import { Endorsement } from '../../../models/endorsement';
import { describe } from 'selenium-webdriver/testing';

describe('AddEndorsementComponent', () => {

  let componentUnderTest: AddEndorsementComponent;

  let employeeService: EmployeeService;
  let dialogRef: MdDialogRef<any>;
  let endorsementService: EndorsementService;
  let categoryService: CategoryService;

  beforeEach(() => {
    employeeService = mock(EmployeeService);
    dialogRef = mock(MdDialogRef);
    endorsementService = mock(EndorsementService);
    categoryService = mock(CategoryService);

    componentUnderTest = new AddEndorsementComponent(
      instance(dialogRef),
      instance(categoryService),
      instance(employeeService),
      instance(endorsementService));
  });

  describe('ngOnInit', () => {

    it('should get all employeesPage', () => {
      const employeesSubject = new Subject();
      const categoriesSubject = new Subject();

      when(employeeService.getEmployees(0, 1000)).thenReturn(employeesSubject.asObservable());
      when(categoryService.getCategories()).thenReturn(categoriesSubject.asObservable());

      componentUnderTest.ngOnInit();

      expect(componentUnderTest.employees).toEqual(jasmine.any(Observable));
      expect(componentUnderTest.categories).toEqual(jasmine.any(Observable));
    });

  });

  describe('addEndorsement', () => {

    it('should call the endorsementService and on success close the dialog and fire the updateEndorsementEvent', () => {
      const endorsement = new Endorsement();
      const endorsementSubject = new Subject();
      when(endorsementService.addEndorsement(endorsement)).thenReturn(endorsementSubject.asObservable());

      componentUnderTest.endorsement = endorsement;
      componentUnderTest.addEndorsement();
      endorsementSubject.next();

      verify(dialogRef.close()).once();
      verify(endorsementService.fireUpdateEndorsementsEvent()).once();
    });

  });

  describe('selectEmpl', () => {})

});
