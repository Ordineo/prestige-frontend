import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
import { EmployeeRankingComponent } from './employee/employee-ranking/employee-ranking.component';
import { PrestigeDetailComponent } from './prestige/prestige-detail/prestige-detail.component';
import { PrestigeFeedComponent } from './prestige/prestige-feed/prestige-feed.component';
import { SearchComponent } from './shared/search/search.component';
import { AuthComponent } from './shared/auth/auth.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { RegistrationFormComponent } from './authentication/registration-form/registration-form.component';
import { LoginGuard } from './providers/login.guard';

const appRoutes: Routes = [
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'employee-ranking',
    component: EmployeeRankingComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'prestige-detail',
    component: PrestigeDetailComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'prestige-feed',
    component: PrestigeFeedComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'registration',
    component: RegistrationFormComponent
  },
  {
    path: '',
    redirectTo: 'login',
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
