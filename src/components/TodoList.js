import TodoItem from "./TodoItem";

export default function TodoList({todos, deleteTodo, toggleTodo}) {
    return (
        <ul>
            {todos.map((todo) =>(
                <TodoItem 
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
                />
            ))}
        </ul>
    );
}