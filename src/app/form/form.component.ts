import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TestService} from '../test.service';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnDestroy, OnInit {
  url;
  msg = '';

  myForm: FormGroup = new FormGroup({
    task: new FormControl('', Validators.required),
    taskName: new FormControl('', Validators.required)
  });

  Adding(tsk, tskName) {
    this.testService.AddDo(tsk, tskName);
  }

  rem(ind) {
    this.testService.RemDo(ind);
  }

  bulCheck(ind) {
    this.testService.bulCheck(ind);
  }

  editing(ind) {
    this.testService.EditDo(ind);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.testService.tsk, event.previousIndex, event.currentIndex);
  }

  selectFile(event, index) {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      this.msg = 'You must select an image';
      return;
    }

    const mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      this.msg = '';
      index.url = reader.result;
    };
  }

  constructor(public testService: TestService, private route: Router) {
  }

  sort(itms) {
    this.testService.sortByTaskName(itms);
  }

  getRoute(ind) {
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
    }
  }


  ngOnDestroy() {
    console.log('Added to localstorage');
    localStorage.setItem('itemId', JSON.stringify(this.testService.ItemId));
    localStorage.setItem('tasks', JSON.stringify(this.testService.tsk));
  }
}

// if (this.obj.task.match(this.regex).join('') && this.obj.taskname.match(this.regex).join('')) {
