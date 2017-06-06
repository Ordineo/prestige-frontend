import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { Md2Module } from 'md2';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PrestigeFeedComponent } from './prestige/prestige-feed/prestige-feed.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { SearchComponent } from './shared/search/search.component';
import { EmployeeRankingComponent } from './employee/employee-ranking/employee-ranking.component';
import { PrestigeDetailComponent } from './prestige/prestige-detail/prestige-detail.component';
import { EmployeeService } from './providers/employee.service';

import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountService } from './providers/account.service';
import { AddPrestigeComponent } from './prestige/add-prestige/add-prestige.component';
import { CategoryService } from './providers/category.service';
import { PrestigeService } from './providers/prestige.service';
import { SortDatePipe } from './shared/sort/sort-date.pipe';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ListboxModule } from 'primeng/primeng';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthService } from './providers/auth.service';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { NavigationBarComponent } from './layout/navigationbar/navigationbar.component';
import { RegistrationFormComponent } from './authentication/registration-form/registration-form.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { AuthenticationPageComponent } from './authentication/authentication-page/authentication-page.component';

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
    ToolbarComponent,
    NavigationBarComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AuthenticationPageComponent
  ],
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
    ReactiveFormsModule
  ],
  providers: [
    EmployeeService,
    AccountService,
    CategoryService,
    PrestigeService,
    AuthService,
    { provide: LOCALE_ID, useValue: 'nl-NL' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountDetailComponent, AddPrestigeComponent]
})
export class AppModule {
}
