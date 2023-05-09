import { Component, Input } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-case',
  templateUrl: './todo-case.component.html',
  styleUrls: ['./todo-case.component.scss', './todo-checkbox.component.scss']
})
export class TodoCaseComponent {
  @Input() todo!: Todo;
  editToggle: boolean = true;
  editText!: string;

  constructor(public todoService: TodoService) {

  }

  openEdit() {
    this.editToggle = false;
    this.editText = this.todo.title;
  }

  editCase() {
    if (!this.editText) return;
    this.todoService.editTodo(this.editText, this.todo.id);
    this.editToggle = true;
  }

}
