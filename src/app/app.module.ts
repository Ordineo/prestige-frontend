import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdCommonModule,
  MdCoreModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdProgressBarModule,
  MdSelectModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndorsementDetailComponent } from './components/endorsements/endorsement-detail/endorsement-detail.component';
import { EndorsementFeedComponent } from './components/endorsements/endorsement-feed/endorsement-feed.component';
import { EmployeeDetailComponent } from './components/employee/employee-detail/employee-detail.component';
import { EmployeeRankingComponent } from './components/employee/employee-ranking/employee-ranking.component';
import { EmployeeSearchComponent } from './components/shared/employee-search/employee-search.component';
import { AccountDetailComponent } from './components/account/account-detail/account-detail.component';
import { SortDatePipe } from './pipes/sort-date/sort-date.pipe';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { NavigationBarComponent } from './components/layout/navigationbar/navigationbar.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegistrationFormComponent } from './components/authentication/registration-form/registration-form.component';
import { AuthenticationPageComponent } from './components/authentication/authentication-page/authentication-page.component';
import { EmployeeService } from './services/employee.service';
import { CategoryService } from './services/category.service';
import { AuthService } from './services/auth.service';
import { EndorsementService } from './services/endorsement.service';
import { AddEndorsementComponent } from './components/endorsements/add-endorsement/add-endorsement.component';
import { UserService } from './services/user.service';
import { AuthenticatedGuard } from './services/guards/authenticated.guard';
import { UnauthenticatedGuard } from './services/guards/unauthenticated.guard';
import { PrestigeHttp } from './services/prestige-http.service';
import { LocalStorageService } from './services/local-storage.service';
import { PagingControlsComponent } from './components/shared/paging-controls/paging-controls.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdDialogModule,
    MdCardModule,
    MdAutocompleteModule,
    MdIconModule,
    MdCoreModule,
    MdCommonModule,
    MdProgressBarModule,
    MdInputModule,
    MdTabsModule,
    MdToolbarModule,
    MdGridListModule,
    MdSelectModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    EmployeeDetailComponent,
    EmployeeRankingComponent,
    AddEndorsementComponent,
    EndorsementFeedComponent,
    EndorsementDetailComponent,
    EmployeeSearchComponent,
    AccountDetailComponent,
    AddEndorsementComponent,
    SortDatePipe,
    ToolbarComponent,
    NavigationBarComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    AuthenticationPageComponent,
    PagingControlsComponent
  ],
  providers: [
    EmployeeService,
    CategoryService,
    EndorsementService,
    AuthService,
    UserService,
    AuthenticatedGuard,
    UnauthenticatedGuard,
    PrestigeHttp,
    LocalStorageService,
    {provide: LOCALE_ID, useValue: 'nl-NL'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [AccountDetailComponent, AddEndorsementComponent]
})
export class AppModule {
}
