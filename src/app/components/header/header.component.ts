import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../../pages/auth/auth.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  extends AuthComponent {

  ngOnInit() {}

  get user(): any { // display localStorage value in html
    return localStorage.getItem('loginSessId');
  }

}