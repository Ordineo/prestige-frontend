import {EndorsementDetailComponent} from './components/endorsements/endorsement-detail/endorsement-detail.component';
import {EndorsementFeedComponent} from './components/endorsements/endorsement-feed/endorsement-feed.component';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CookieModule} from 'ngx-cookie';
import {AppRoutingModule} from './app-routing.module';

import {Md2Module} from 'md2';
import {MaterialModule} from '@angular/material';

import {AppComponent} from './app.component';

import {FlexLayoutModule} from '@angular/flex-layout';

import {ListboxModule} from 'primeng/primeng';
import {EmployeeDetailComponent} from './components/employee/employee-detail/employee-detail.component';
import {EmployeeRankingComponent} from './components/employee/employee-ranking/employee-ranking.component';
import {SearchComponent} from './components/shared/search/search.component';
import {AccountDetailComponent} from './components/account/account-detail/account-detail.component';
import {SortDatePipe} from './pipes/sort-date/sort-date.pipe';
import {ToolbarComponent} from './components/layout/toolbar/toolbar.component';
import {NavigationBarComponent} from './components/layout/navigationbar/navigationbar.component';
import {LoginFormComponent} from './components/authentication/login-form/login-form.component';
import {RegistrationFormComponent} from './components/authentication/registration-form/registration-form.component';
import {AuthenticationPageComponent} from './components/authentication/authentication-page/authentication-page.component';
import {EmployeeService} from './services/employee.service';
import {CategoryService} from './services/category.service';
import {AuthService} from './services/auth.service';
import {EndorsementService} from './services/endorsement.service';
import {AddEndorsementComponent} from './components/endorsements/add-endorsement/add-endorsement.component';
import {UserService} from './services/user.service';
import {AuthenticatedGuard} from './services/guards/authenticated.guard';
import {UnauthenticatedGuard} from './services/guards/unauthenticated.guard';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    Md2Module.forRoot(),
    AppRoutingModule,
    ListboxModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CookieModule.forRoot()
  ],
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeRankingComponent,
    AddEndorsementComponent,
    EndorsementFeedComponent,
    EndorsementDetailComponent,
    SearchComponent,
    AccountDetailComponent,
    AddEndorsementComponent,
    SortDatePipe,
    ToolbarComponent,
    NavigationBarComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AuthenticationPageComponent
  ],
  providers: [
    EmployeeService,
    CategoryService,
    EndorsementService,
    AuthService,
    UserService,
    AuthenticatedGuard,
    UnauthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'nl-NL' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountDetailComponent, AddEndorsementComponent]
})
export class AppModule {
}
