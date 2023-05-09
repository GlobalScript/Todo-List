import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private list: Todo[] = [];

  private saveTodos = (todos: Todo[]): void => {
    localStorage.setItem('todo', JSON.stringify(todos))
  }

  loadingTodo(list: Todo[]) {
    this.list = list;
  }

  getList(): Todo[] {
    return this.list;
  }

  addTodo(value: string): void {
    this.list.unshift({
      id: new Date().toISOString(),
      title: value,
      completed: false,
    })
    this.saveTodos(this.list);
  }

  editTodo(title: string, id: string) {
    const todo = this.list.find(item => item.id === id);
    if (todo) todo.title = title;
    this.saveTodos(this.list);
  }

  toggleCompleted(id: string) {
    let indexTodo: number = 0;
    const todo = this.list.find((item, index) => {
      if (item.id !== id) return false
      indexTodo = index;
      return true;
    });
    if (!todo) return;
    todo.completed = !todo.completed;
    if (todo.completed) {
      this.list.push(this.list[indexTodo]);
      this.list.splice(indexTodo, 1);
    }
    else {
      this.list.unshift(this.list[indexTodo]);
      this.list.splice((indexTodo + 1), 1);
    }
    this.saveTodos(this.list);
  }


  removeTodo(id: string) {
    this.list = this.list.filter((todo) => todo.id !== id);
    this.saveTodos(this.list);
  }

  clearList() {
    this.list = [];
    localStorage.removeItem('todo');
  }
}
