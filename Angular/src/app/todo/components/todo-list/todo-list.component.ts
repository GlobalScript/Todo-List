import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  constructor(public todoService: TodoService) {
    const getList = localStorage.getItem('todo')
    if (getList) todoService.loadingTodo(JSON.parse(getList));
  }
}
