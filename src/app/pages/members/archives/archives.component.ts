import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArchivesService } from '../../../services/members/archives/archives.service';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  private destroyed$: Subject<{}> = new Subject();
  public keyUp = new Subject<any>();
  public archives: any[];

  constructor(
    private _archivesService : ArchivesService) {
    const subscription = this.keyUp
    .map(event => event.target.value)
    .debounceTime(500)
    .distinctUntilChanged()
    .flatMap(search => Observable.of(search).delay(500))
    .subscribe(data => {
      this.searchArchives(data)
    });
  }
 
  ngOnInit() {
    this._archivesService.archives()
    .takeUntil(this.destroyed$)
    .subscribe(data => this.archives = data);
  }

  searchArchives(str) {
    if(str.length > 0) {
      this._archivesService.searchMemberFromArchives(str)
      .take(1)
      .subscribe(data => this.archives = data);
    } else {
      this._archivesService.archives().takeUntil(this.destroyed$)
      .subscribe(data => this.archives = data);
    }
  }

  restore(id:number, index:number) {
    this._archivesService.restore(id);
    this.archives.splice(index, 1);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
