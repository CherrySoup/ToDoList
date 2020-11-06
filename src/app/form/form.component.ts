import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TestService} from '../test.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Task } from '../models/task.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnDestroy, OnInit {

  myForm: FormGroup = new FormGroup({
    task: new FormControl('', Validators.required),
    taskName: new FormControl('', Validators.required)
  });

  Adding(tsk: string, tskName: string) {
    this.testService.AddTask(tsk, tskName);
  }

  removing(ind: number, item: Task) {
    this.testService.RemoveTask(ind, item);
  }

  bulCheck(ind) {
    this.testService.checkEditing(ind);
  }

  editing(ind: Task) {
    this.testService.EditTask(ind);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.testService.tsk, event.previousIndex, event.currentIndex);
  }

  selectFile(event, index: Task) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      index.url = reader.result;
    };
  }

  constructor(public testService: TestService, private route: Router) {
  }

  sorting() {
    this.testService.sortByTaskName();
  }

  getRoute(ind: Task) {
    this.route.navigate(['/first', ind.itemId]);

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    this.ngOnDestroy();
  }

  ngOnInit() {
    if (localStorage.tasks) {
      console.log('Taken');
      this.testService.tsk = JSON.parse(localStorage.getItem('tasks'));
      this.testService.ItemId = JSON.parse(localStorage.getItem('itemId'));
      this.testService.completeTsk = JSON.parse(localStorage.getItem('completeTasks'));
    }
  }


  ngOnDestroy() {
    console.log('Added to localstorage');
    localStorage.setItem('itemId', JSON.stringify(this.testService.ItemId));
    localStorage.setItem('tasks', JSON.stringify(this.testService.tsk));
    localStorage.setItem('completeTasks', JSON.stringify(this.testService.completeTsk));
  }
}

// if (this.obj.task.match(this.regex).join('') && this.obj.taskname.match(this.regex).join('')) {
