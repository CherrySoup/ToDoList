import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {TestService} from '../test.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-doings',
  templateUrl: './doings.component.html',
  styleUrls: ['./doings.component.scss']
})
export class DoingsComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:radix
  public idd = parseInt(this.activateRoute.snapshot.paramMap.get('id'));

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.ngOnDestroy();
  }

  constructor(private activateRoute: ActivatedRoute,
              public testService: TestService) {
  }

  ngOnInit() {
    if (localStorage.tasks) {
      console.log('Taken');
      this.testService.tsk = JSON.parse(localStorage.getItem('tasks'));
      this.testService.ItemId = JSON.parse(localStorage.getItem('itemId'));
    }
  }

  ngOnDestroy() {
    console.log('Added to localstorage');
    localStorage.setItem('tasks', JSON.stringify(this.testService.tsk));
    localStorage.setItem('itemId', JSON.stringify(this.testService.ItemId));
  }
}
