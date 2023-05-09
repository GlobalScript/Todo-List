import { Todo } from '../types';
import { TodoState } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TodoState = {
  list: [],
}

const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem('todo', JSON.stringify(todos))
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadingTodo(state, action: PayloadAction<Todo[]>) {
      state.list = action.payload;
    },
    addTodo(state, action: PayloadAction<string>) {
      state.list.unshift({
        id: new Date().toISOString(),
        title: action.payload,
        completed: false,
      });
      saveTodos(state.list);
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const todo = state.list.find(item => item.id === action.payload.id);
      if (todo) todo.title = action.payload.title;
      saveTodos(state.list);
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      let indexTodo: number = 0;
      const todo = state.list.find((item, index) => {
        if (item.id === action.payload) {
          indexTodo = index;
          return true;
        }
      });
      if (!todo) return;
      todo.completed = !todo.completed;
      if (todo.completed) {
        state.list.push(state.list[indexTodo]);
        state.list.splice(indexTodo, 1);
      }
      else {
        state.list.unshift(state.list[indexTodo]);
        state.list.splice((indexTodo + 1), 1);
      }
      saveTodos(state.list);
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
      saveTodos(state.list);
    },
    clearList(state) {
      state.list = [];
      localStorage.removeItem('todo');
    }
  }
});

export const { addTodo, toggleCompleted, removeTodo, clearList, editTodo, loadingTodo } = todoSlice.actions;

export default todoSlice.reducer;