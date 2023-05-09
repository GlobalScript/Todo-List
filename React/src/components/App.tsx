import TodoForm from './todo-form/TodoForm';
import TodoList from './todo-list/TodoList';

const App: React.FC = () => {
    return <div className="todo__container">
        <TodoForm />
        <TodoList />
    </div>
}

export default App;