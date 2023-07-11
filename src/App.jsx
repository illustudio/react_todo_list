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
  const [work, setWork] = useState([]);
  const onAddWork = (addWork) => {
    setWork((prevState) => [...prevState, addWork]);
  };
  const onRemoveWork = (id) => {
    const newWorkList = work.filter((todo) => todo.id !== id);
    setWork(newWorkList);
  };
  const onUpdateWork = (item) => {
    const newWorkList = work.map((todo) => {
      if (todo.id === item.id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setWork(newWorkList);
  };
  const onUpdateTodo = (id, content) => {
    const newWorkList = work.map((todo) => {
      if (todo.id === id) {
        todo.todo = content;
      }
      return todo;
    });
    setWork(newWorkList);
  };
  return (
    <Container>
      <Title>Todo List</Title>
      <Form onAddWorkHandler={onAddWork} />
      <List
        list={work}
        onRemove={onRemoveWork}
        onUpdate={onUpdateWork}
        onUpdateTodo={onUpdateTodo}
      />
    </Container>
  );
}

export default App;
