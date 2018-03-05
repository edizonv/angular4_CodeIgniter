import { Component, OnInit, OnDestroy } from '@angular/core';
import { MembersService } from '../../services/members/members.service';
import { ActivatedRoute } from '@angular/router';
import { SetStatusPipe } from '../../pipes/status/set-status.pipe';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-members-all',
  templateUrl: './members-all.component.html',
  styleUrls: ['./members-all.component.css']
})

export class MembersAllComponent implements OnInit {

  public keyUp = new Subject<any>();
  public members: any[];
  public msg: string;
  public id: any[] = [];
  public ind: any[] = [];
  private destroyed$: Subject<{}> = new Subject();

  constructor(
    private _membersService: MembersService,
    private _router: ActivatedRoute,
    private _setStatus: SetStatusPipe
  ) {
    const subscription = this.keyUp
    .map(event => event.target.value).debounceTime(500).distinctUntilChanged()
    .flatMap(search => Observable.of(search).delay(500))
    .subscribe(data => { this.search(data) });
  }

  ngOnInit() {
   let page = this._router.snapshot.params['page'];
    page != 'edit' ? this._membersService.getMembers().takeUntil(this.destroyed$).subscribe(data => this.members = data) : "";
  }

  delete(id:number, index:number) {
    this._membersService.deleteUser(id);
    this.members.splice(index, 1);
    this.msg = 'User with #'+id+' has been deleted';
  }

  public toInt(num: string) {
    return +num;
}

  search(str) {
    if(str.length > 0){
      this._membersService.searchMember(str)
      .take(1)
      .subscribe(
        data => this.members = data
      );
    } else {
      this._membersService.getMembers()
      .takeUntil(this.destroyed$)
      .subscribe(data => this.members = data);
    }
  }

  removeSel() {
    for (let x = 0; x < this.ind.length; x++) {
      this._membersService.deleteBatch(this.id[x]);
    }
    this.members = this.members.filter( (_, idx) =>this.ind.indexOf(idx) === -1)
  }

  selChk(val:number, index:number) {
    var i =  this.id.indexOf(val);
    if(i === -1) {
      this.id.push(val);
      this.ind.push(index);
    } else {
      this.id.splice(index,1);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}