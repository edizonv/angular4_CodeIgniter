import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../services/members/members.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  constructor(
    private _Actrouter: ActivatedRoute,
    private _router: Router,
    private _membersService: MembersService
  ){ }

  public activePage:number;

  ngOnInit() {
    !localStorage.getItem('loginSessId') ? this._router.navigate(['/auth']) : "";
    let page = this._Actrouter.snapshot.params['page'],
        param = this._Actrouter.snapshot.params['param'];

    switch(param) {
      case 'add':
        this.activePage = 2;
        break;
      case 'archives':
        this.activePage = 1;
        break;
      default:
        if(page == 'edit') {
          let id = this._Actrouter.snapshot.params['id'];
          id ? this.activePage = 2 : console.log('page not found');
        } else {
          let ID = this._Actrouter.snapshot.params['param'];
          ID ? this.activePage = 4 : this.activePage = 5;
        }
    }
    
  }

}
