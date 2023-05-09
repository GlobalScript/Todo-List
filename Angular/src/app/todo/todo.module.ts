import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoCaseComponent } from './components/todo-case/todo-case.component';



@NgModule({
  declarations: [
    TodoFormComponent,
    TodoListComponent,
    TodoCaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    TodoFormComponent,
    TodoListComponent
  ]
})
export class TodoModule { }
