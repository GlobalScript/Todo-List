import { useState } from 'react';
import { Todo } from '../../types';
import { useAppDispatch } from '../../store/hook';
import { toggleCompleted, removeTodo, editTodo } from '../../store/todoSlice';


const TodoCase: React.FC<Todo> = ({ id, title, completed }) => {
  const [value, setValue] = useState(title);
  const [toggle, setToggle] = useState(true);
  const dispatch = useAppDispatch();

  const editTitle = (): void => {
    dispatch(editTodo({ id, title: value, completed }));
    setToggle(true);
  }

  const enterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') editTitle();
  }

  return (
    <li>
      <div className="todo__list-case">
        <input type="checkbox" checked={completed} onChange={() => dispatch(toggleCompleted(id))} />
        {toggle && <label onClick={() => dispatch(toggleCompleted(id))}></label>}
        <p>{toggle ? title : <input type="text"
          value={value}
          className="todo__list-edit-input"
          onChange={(e) => setValue(e.target.value)}
          onBlur={editTitle}
          onKeyDown={enterKeyDown}
        />}</p>
      </div>
      <div className="todo__list-buttons">
        <button className="todo__list-edit" onClick={() => setToggle(false)}>&#9998;</button>
        <button className="todo__list-remove" onClick={() => dispatch(removeTodo(id))}>X</button>
      </div>
    </li>
  );
}

export default TodoCase;