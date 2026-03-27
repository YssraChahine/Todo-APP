import styled from "styled-components";

const Item = styled.li`
  margin-top: 15px;
  padding: 12px;
  border-radius: 10px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.2s;
  &:hover {
    background: #f1f1f1;
  }
`;

const Text = styled.span`
  cursor: pointer;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "#999" : "#333")};
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;

export default function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <Item>
      <Text completed={todo.completed} onClick={() => toggleTodo(todo.id)}>
        {todo.text}
      </Text>

      <DeleteButton onClick={() => deleteTodo(todo.id)}>Delete</DeleteButton>
    </Item>
  );
}
