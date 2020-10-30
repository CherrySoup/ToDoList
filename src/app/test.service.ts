import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  ItemId = 1;
  tsk: Array<Task> = [];

  public sortByTaskName(itms) {
    itms.sort((a, b) => a.taskName > b.taskName ? 1 : -1);
  }

  public AddTask(tsk: string, tskName: string) {
    this.tsk.push({
      task: tsk,
      taskName: tskName,
      bule: false,
      taskChange: null,
      taskNameChange: null,
      url: null,
      itemId: this.ItemId
    });
    this.ItemId++;
  }

  public RemoveTask(index: number) {
    this.tsk.splice(index, 1);
  }

  public checkEditing(index: Task) {
    index.bule = true;
  }

  public EditTask(index: Task) {
    index.task = index.taskChange;
    index.taskName = index.taskNameChange;
    index.bule = false;
  }

  constructor(private route: Router) {
  }
}
