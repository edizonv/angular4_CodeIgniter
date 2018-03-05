import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MembersService {

  constructor(private _http: Http) {
  }
  
  getMembers() {
    return this._http.get('http://localhost/main/getUsers')
      .map(response => response.json() );
  }

  getMemberById(id:number) {
    return this._http.get('http://localhost/main/getUserById/'+id)
    .map(res => res.json() );
  }

  getMemberById2(id:number) {
    return this._http.get('http://localhost/main/getUserById2/'+id)
    .map(res => res.json() );
  }

  addUser(data) {
    return this._http.post('http://localhost/main/addUser/', data)
    .subscribe(data => data);
  }

  editUser(data) {
    return this._http.post('http://localhost/main/editUser', data)
    .subscribe(data => data);
  }

  deleteUser(data) {
    return this._http.post('http://localhost/main/deleteUser', data)
    .subscribe(data => data);
  }

  login(data:string) {
    return this._http.post('http://localhost/main/login', data);
  }

  logout(data) {
    return this._http.get('http://localhost/main/logout/'+data)
    .subscribe(data => data);
  }

  searchMember(str:string) {
    return this._http.get('http://localhost/main/searchMember/'+str)
    .map(res => res.json() );
  }

  deleteBatch(ids) {
    return this._http.post('http://localhost/main/deleteBatchUser', ids)
    .subscribe(data => data);
  }
  
}
