import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  regex = /\S/g;
  url;
  ItemId = 1;
  tsk = [];
  public sortByTaskName(itms){
    itms.sort((a, b) => a.taskName > b.taskName ? 1 : -1);
  }
  public methodAdd(tsk, tskName){
    this.tsk.push({
      task: tsk,
      taskName: tskName,
      bule: false,
      taskChange: '',
      taskNameChange: '',
      url: '',
      itemId: this.ItemId
    });
    this.ItemId++;
  }
  public methodRem(index){
    this.tsk.splice(index, 1);
  }
  public bulCheck(index){
    index.bule = 1;
  }
  public methodEdit(index){
      index.task = index.taskChange;
      index.taskName = index.taskNameChange;
      index.bule = 0;
  }
  getTasks() {
    if (localStorage.getItem('tasks')) {
      this.tsk = JSON.parse(localStorage.getItem('tasks'));
      this.ItemId = JSON.parse(localStorage.getItem('itemId'));
    }
    return this.tsk;
  }
  constructor(private route: Router) { }
}