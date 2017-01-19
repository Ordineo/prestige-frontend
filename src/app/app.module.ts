import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PrestigeFeedComponent } from './shared/prestige-feed/prestige-feed.component';
import { ProfileDetailComponent } from './shared/profile-detail/profile-detail.component';
import { SearchComponent } from './shared/search/search.component';
import { RouterModule, Routes } from '@angular/router';

// custom search input for material2
import {Md2Module} from 'md2';

// include Bootstrap Alpha 4
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// include material2
import { MaterialModule } from '@angular/material';
import 'hammerjs';

const appRoutes: Routes = [
  { path: 'prestige-feed', component: PrestigeFeedComponent },
  {
    path: 'my-profile',
    component: ProfileDetailComponent
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
    SearchComponent
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
