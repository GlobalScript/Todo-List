import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {

  title!: string;

  constructor(public todoService: TodoService) { }

  addCase() {
    if (!this.title) return
    this.todoService.addTodo(this.title);
    this.title = '';
  }
}
