import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PrestigeFeedComponent } from './prestige/prestige-feed/prestige-feed.component';
import { ProfileDetailComponent } from './employee/employee-detail/profile-detail.component';
import { SearchComponent } from './shared/search/search.component';
import { RouterModule, Routes } from '@angular/router';

import {Md2Module} from 'md2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { EmployeeRankingComponent } from './employee/employee-ranking/employee-ranking.component';
import { PrestigeDetailComponent } from './prestige/prestige-detail/prestige-detail.component';

const appRoutes: Routes = [
  { path: 'prestige-feed', component: PrestigeFeedComponent },
  {
    path: 'prestige-detail',
    component: PrestigeDetailComponent
  },
  { path: '',
    redirectTo: '/prestige-feed',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PrestigeFeedComponent,
    ProfileDetailComponent,
    SearchComponent,
    EmployeeRankingComponent,
    PrestigeDetailComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    Md2Module.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
