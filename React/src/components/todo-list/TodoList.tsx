import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { clearList, loadingTodo } from '../../store/todoSlice';
import TodoItem from '../todo-case/TodoCase';


const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.list);

  useEffect(() => {
    const getList = localStorage.getItem('todo')
    if (getList) dispatch(loadingTodo(JSON.parse(getList)))
  }, []);

  const clearTodoList = (): void => {
    dispatch(clearList());
  }

  return <>
    <ul className="todo__list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
    {todos.length > 0 && <button
      className="todo__clear-items"
      onClick={clearTodoList}>
      Clear items</button>}
  </>
};

export default TodoList;