import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {Routes, RouterModule} from '@angular/router';

import { TestService } from './test.service';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Form2Component } from './form2/form2.component';
import { DoingsComponent } from './doings/doings.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/first', pathMatch: 'full'},
  { path: 'first', component: FormComponent },
  { path: 'second', component: Form2Component },
  { path: 'first/:id', component: DoingsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    Form2Component,
    DoingsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    DragDropModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  exports: [
    DragDropModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

