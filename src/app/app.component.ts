import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public isUserLoggedIn(): boolean {
    return this.authService.userLoggedIn;
  }

}
