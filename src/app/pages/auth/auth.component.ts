import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MembersService } from '../../services/members/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  constructor(
    private _membersService: MembersService,
    private _router: Router
  ) {}

  loginForm;
  data;

  ngOnInit() {
    let loginSessId = localStorage.getItem('loginSessId');
    loginSessId ? this._router.navigate(['/members']) : "";
    
    this.loginForm = new FormGroup({
      acct_username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),
      acct_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }
  
  onSubmit = function(formData, loginMsg:boolean) {
    this._membersService.login(formData).subscribe((response) => {
      if(response.text() == 'success') {
        localStorage.setItem('loginSessId', formData.acct_username);
        this._router.navigate(['/']);
      } else {
        this.loginMsg = true;
      }
    });
  }

  logout(string: any) {
    this._membersService.logout(string);
    localStorage.removeItem('loginSessId');
    this._router.navigate(['/auth']);
  }

}
