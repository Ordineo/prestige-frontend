import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Prestige} from "../../models/prestige";
import {MdDialogRef} from "@angular/material";
import {Observable} from "rxjs";
import {CategoryService} from "../../providers/category.service";
import {EmployeeService} from "../../providers/employee.service";
import {AccountService} from "../../providers/account.service";
import {PrestigeService} from "../../providers/prestige.service";

import {ListboxModule} from 'primeng/primeng';
import {SelectItem} from "primeng/components/common/api";

@Component({
  selector: 'app-add-prestige',
  templateUrl: './add-prestige.component.html',
  styleUrls: ['./add-prestige.component.scss']
})

export class AddPrestigeComponent implements OnInit {

  receivers: Observable <any>;
  prestige: Prestige;
  categories: Observable <any>;
  granter: any;

  testData: string;
  materialLook: boolean = false;

  constructor(public dialogRef: MdDialogRef<any>,
              private categoryService: CategoryService,
              private employeeService: EmployeeService,
              private prestigeService: PrestigeService,
              private accountService: AccountService) {
  }

  addPrestige() {
    //this.prestige.receiver = this.selectedReceivers;
    console.log("---- ADD :", this.prestige);
    this.prestigeService.add(this.prestige).subscribe();
    this.dialogRef.close();
  }

  setTestData() {
    let data = {label: this.testData, value: this.testData};
    this.prestigeService.addTest(data);
    this.testData = "";
  }

  ngOnInit() {
    /**
     * test
     */
    /*this.employeeService.getTestData()
      .subscribe(result => {
        this.receivers = result;
      });*/

    this.categoryService.get()
      .subscribe(result => {
        this.categories = result.categories;
      });

    this.employeeService.get()
      .subscribe(result => {
        this.receivers = result.employees;
        console.log(result.employees);
      });

    // todo: remove multiple choice

    this.prestige = {
      receiver: this,
      categories: this,
      prestige: 1,
      reason: "lol",
      url: "",
      created: new Date().toISOString()
    }
  }

}
