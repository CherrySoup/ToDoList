import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit, OnDestroy {

  constructor(public testService: TestService) { }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.ngOnDestroy();
  }
  ngOnInit(): void {
    this.testService.completeTsk = JSON.parse(localStorage.getItem('completeTasks'));
    this.testService.tsk = JSON.parse(localStorage.getItem('tasks'));
    this.testService.ItemId = JSON.parse(localStorage.getItem('itemId'));
  }

  ngOnDestroy(): void {
    localStorage.setItem('itemId', JSON.stringify(this.testService.ItemId));
    localStorage.setItem('tasks', JSON.stringify(this.testService.tsk));
    localStorage.setItem('completeTasks', JSON.stringify(this.testService.completeTsk));
  }
}
