import { useState } from 'react';
import { useAppDispatch } from '../../store/hook';
import { addTodo } from '../../store/todoSlice';


const TodoForm: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const addCase = () => {
    if (value.trim().length) {
      dispatch(addTodo(value));
      setValue('');
    }
  }
  const enterKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') addCase();
  }
  return (
    <div className="todo__header">
      <h2 className="todo__header-title">Todo list</h2>
      <div className="todo__header-input-field">
        <input type="text" className="todo__header-input" placeholder="new case" value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={enterKeyDown} />
        <button className="todo__header-add" onClick={addCase}>Add</button>
      </div>
    </div>
  );
};

export default TodoForm;