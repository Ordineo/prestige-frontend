import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Account } from '../../../models/account';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employees-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.scss']
})
export class EmployeeSearchComponent implements OnInit {

  public searchTextControl: FormControl = new FormControl();
  public filteredOptions: Observable<Account[]>;
  @Input() public onEmployeeSelect: (employee: Account) => void;
  private inputResettable: boolean;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.filteredOptions = this.searchTextControl
      .valueChanges
      .debounceTime(400)
      .flatMap((text: string) => {
        if (this.inputResettable) {
          this.doResetInput();
          this.inputResettable = false;
          return Observable.of([]);
        } else {
          return this.employeeService.searchEmployees({username: text, firstName: '', lastName: ''});
        }
      });
  }

  makeInputResettable() {
    this.inputResettable = true;
  }

  doResetInput() {
    this.searchTextControl.reset();
  }

}
