import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  url;
  ItemId = 1;
  tsk = [];

  public sortByTaskName(itms) {
    itms.sort((a, b) => a.taskName > b.taskName ? 1 : -1);
  }

  public AddTask(tsk, tskName) {
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

  public RemoveTask(index) {
    this.tsk.splice(index, 1);
  }

  public checkEditing(index) {
    index.bule = 1;
  }

  public EditTask(index) {
    index.task = index.taskChange;
    index.taskName = index.taskNameChange;
    index.bule = 0;
  }

  constructor(private route: Router) {
  }
}
