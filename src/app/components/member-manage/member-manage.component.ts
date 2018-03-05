/* --------------------------------------------
|  ADD & EDIT PAGE
| --------------------------------------------
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembersService } from '../../services/members/members.service';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.css']
})
export class MemberManageComponent implements OnInit {

  constructor(
    private _router: ActivatedRoute,
    private _membersService: MembersService
  ) { }

  public ngForm: FormGroup;
  public member:string;
  public user_firstname:string;
  public user_lastname:string;
  public idUser:number;
  public isAdd:boolean;
  public userId:number;

  ngOnInit() {
    let userId = this._router.snapshot.params['id'],
        page = this._router.snapshot.params['page'];
    
    if(page != 'edit') {
      this.isAdd = true
    } else {
      this.isAdd = false;
      this._membersService.getMemberById2(userId)
      .take(1)
      .subscribe(data => {
        this.user_firstname = data.firstname,
        this.user_lastname = data.lastname,
        this.idUser = data.id
      });
    }

    //Validate Form
    this.ngForm = new FormGroup({
      user_firstname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]) ),
      user_lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ]) ),
      idUser: new FormControl('')
    })
  }

 onSubmit = function(formData) {
  let page = this._router.snapshot.params['page'];
  if(page == 'edit') {
    this._membersService.editUser(formData);
    this.msg = 'Member info updated!';
  } else {
      if( (formData.user_firstname && formData.user_lastname) ) {
        this._membersService.addUser(formData);
        this.msg = 'New member added!';
      }
    }
  }

}
