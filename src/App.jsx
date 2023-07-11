import Form from "./components/Form.jsx";
import styled from "styled-components";
import List from "./components/List.jsx";
import { useState } from "react";
const Title = styled.h1`
  font-size: 2rem;
  text-transform: uppercase;
`;
const Container = styled.main`
  display: grid;
  width: 100%;
  padding: 1rem;
  row-gap: 1rem;
`;
function App() {
  const [todo, setTodo] = useState([]);
  const onAddTodo = (newTodo) => {
    setTodo((prevState) => [...prevState, newTodo]);
  };
  const onRemove = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };
  const onUpdateDone = (item) => {
    const newTodo = todo.map((todo) => {
      if (todo.id === item.id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodo(newTodo);
  };
  const onUpdateTodo = (id, newTodo) => {
    const newTodoList = todo.map((todo) => {
      if (todo.id === id) {
        todo.todo = newTodo;
      }
      return todo;
    });
    setTodo(newTodoList);
  };
  return (
    <Container>
      <Title>Todo List</Title>
      {/*todo filter 기능 추가할것*/}
      <Form onAddTodo={onAddTodo} />
      <List
        list={todo}
        onRemove={onRemove}
        onUpdateDone={onUpdateDone}
        onUpdateTodo={onUpdateTodo}
      />
    </Container>
  );
}

export default App;
