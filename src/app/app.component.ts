import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {TestService} from './test.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test1';
  constructor( private rout: Router, public testService: TestService){}
}
