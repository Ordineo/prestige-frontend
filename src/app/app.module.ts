import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import {Md2Module} from 'md2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { PrestigeFeedComponent } from './prestige/prestige-feed/prestige-feed.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { SearchComponent } from './shared/search/search.component';
import { EmployeeRankingComponent } from './employee/employee-ranking/employee-ranking.component';
import { PrestigeDetailComponent } from "./prestige/prestige-detail/prestige-detail.component";
import { CategoriesComponent } from './shared/categories/categories.component';
import { PrestigesComponent } from './shared/prestige/prestige.component';
import { EmployeeService } from './providers/employee.service';

import { AngularFireModule, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { firebaseConfig } from './firebase.config';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import {AccountService} from "./providers/account.service";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeRankingComponent,
    PrestigeDetailComponent,
    PrestigeFeedComponent,
    SearchComponent,
    CategoriesComponent,
    PrestigesComponent,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Md2Module.forRoot(),
    NgbModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    EmployeeService,
    AccountService
  ],
  bootstrap: [ AppComponent ],
  entryComponents:[AccountDetailComponent]
})
export class AppModule { }
