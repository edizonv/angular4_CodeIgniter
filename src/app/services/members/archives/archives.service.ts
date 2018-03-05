import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArchivesService {

  constructor(private _http: Http) {
  }
  
  archives() {
    return this._http.get('http://localhost/main/getUsersArchives')
    .map(res => res.json() );
  }

  searchMemberFromArchives(str) {
    return this._http.get('http://localhost/main/searchMemberFromArchives/'+str)
    .map(res => res.json() );
  }

  restore(id) {
    return this._http.post('http://localhost/main/restore', id)
    .subscribe(data => data);
  }
}
