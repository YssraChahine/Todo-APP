import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const Container = styled.div`
  max-width: 420px;
  margin: 80px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
  &:focus {
    border-color: #4f46e5;
  }
`;

const Button = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #4338ca;
  }
`;

const FilterContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.active ? "#4f46e5" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
`;

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <Container>
      <Title>ToDo App</Title>

      <InputWrapper>
        <Input
          type="text"
          placeholder="Add a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo}
        />
        <Button onClick={addTodo}>Add</Button>
      </InputWrapper>

      <FilterContainer>
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All
        </FilterButton>
        <FilterButton
          active={filter === "active"}
          onClick={() => setFilter("active")}
        >
          Active
        </FilterButton>
        <FilterButton
          active={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </FilterButton>
      </FilterContainer>

      <TodoList
        todos={filteredTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    </Container>
  );
}
