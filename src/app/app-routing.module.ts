import { EndorsementFeedComponent } from './components/endorsements/endorsement-feed/endorsement-feed.component';
import { EndorsementDetailComponent } from './components/endorsements/endorsement-detail/endorsement-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './components/employee/employee-detail/employee-detail.component';
import { EmployeeRankingComponent } from './components/employee/employee-ranking/employee-ranking.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegistrationFormComponent } from './components/authentication/registration-form/registration-form.component';
import { AuthenticatedGuard } from './services/guards/authenticated.guard';
import { UnauthenticatedGuard } from './services/guards/unauthenticated.guard';

const appRoutes: Routes = [
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'employee-ranking',
    component: EmployeeRankingComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'prestige-detail',
    component: EndorsementDetailComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'prestige-feed',
    component: EndorsementFeedComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: '',
    redirectTo: 'prestige-feed',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
