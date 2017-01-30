import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';

import {AppComponent} from './app.component';
import {EmployeeDetailComponent} from './employee/employee-detail/employee-detail.component';
import {EmployeeRankingComponent} from './employee/employee-ranking/employee-ranking.component';
import {PrestigeDetailComponent} from "./prestige/prestige-detail/prestige-detail.component";
import {PrestigeFeedComponent} from './prestige/prestige-feed/prestige-feed.component';
import {CategoriesComponent} from './shared/categories/categories.component';
import {SearchComponent} from './shared/search/search.component';

const appRoutes: Routes = [
  {
    path: 'employee-detail',
    component: EmployeeDetailComponent
  },
  {
    path: 'employee-ranking',
    component: EmployeeRankingComponent
  },
  {
    path: 'prestige-detail/:id',
    component: PrestigeDetailComponent
  },
  {
    path: 'prestige-feed',
    component: PrestigeFeedComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: '',
    redirectTo: '/prestige-feed',
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
