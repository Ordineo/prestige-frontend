import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app-routing.module';

import {Md2Module} from 'md2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '@angular/material';
import 'hammerjs';

import {AppComponent} from './app.component';
import {PrestigeFeedComponent} from './prestige/prestige-feed/prestige-feed.component';
import {EmployeeDetailComponent} from './employee/employee-detail/employee-detail.component';
import {SearchComponent} from './shared/search/search.component';
import {EmployeeRankingComponent} from './employee/employee-ranking/employee-ranking.component';
import {PrestigeDetailComponent} from "./prestige/prestige-detail/prestige-detail.component";
import {EmployeeService} from './providers/employee.service';

import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from './firebase.config';
import {AccountDetailComponent} from './account/account-detail/account-detail.component';
import {AccountService} from "./providers/account.service";
import {AddPrestigeComponent} from './prestige/add-prestige/add-prestige.component';
import {CategoryService} from "./providers/category.service";
import {PrestigeService} from "./providers/prestige.service";
import {SortDatePipe} from './shared/sort/sort-date.pipe';

import {FlexLayoutModule} from "@angular/flex-layout";

import {ListboxModule} from 'primeng/primeng';
import { AuthComponent } from './shared/auth/auth.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./providers/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeRankingComponent,
    PrestigeDetailComponent,
    PrestigeFeedComponent,
    SearchComponent,
    AccountDetailComponent,
    AddPrestigeComponent,
    SortDatePipe,
    AuthComponent,
    LoginComponent,
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
    ListboxModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    EmployeeService,
    AccountService,
    CategoryService,
    PrestigeService,
    AuthService,
    { provide: LOCALE_ID, useValue: "nl-NL" }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountDetailComponent, AddPrestigeComponent]
})
export class AppModule {
}
