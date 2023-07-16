import { useState } from "react";
import Form from "./components/Form.jsx";
import styled from "styled-components";
import List from "./components/List.jsx";
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
const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;
const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
  &.active {
    background-color: black;
    color: white;
  }
`;
function App() {
  const [todo, setTodo] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    { id: 0, name: "전부보기", content: todo },
    { id: 1, name: "작업중", content: todo.filter((item) => !item.done) },
    { id: 2, name: "작업완료", content: todo.filter((item) => item.done) },
  ];
  // 작업추가
  const onAddTodo = (newTodo) => {
    setTodo((prevState) => [...prevState, newTodo]);
    setCurrentTab(0);
  };

  // 작업삭제
  const onRemove = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };

  // 할일 상태 변경
  const onUpdateDone = (item) => {
    const newTodo = todo.map((todo) => {
      if (todo.id === item.id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    setTodo(newTodo);
  };

  // 할일 내용 변경
  const onUpdateTodo = (id, newTodo) => {
    const newTodoList = todo.map((todo) => {
      if (todo.id === id) {
        todo.todo = newTodo;
      }
      return todo;
    });
    setTodo(newTodoList);
  };
  const currentTabHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <Form onAddTodo={onAddTodo} />
      <Tabs>
        {tabs.map((button, index) => (
          <TabButton
            key={button.id}
            onClick={() => currentTabHandler(index)}
            className={index === currentTab ? "active" : ""}
          >
            {button.name.toUpperCase()} {tabs[index].content.length}
          </TabButton>
        ))}
      </Tabs>
      <List
        list={tabs[currentTab].content}
        onRemove={onRemove}
        onUpdateDone={onUpdateDone}
        onUpdateTodo={onUpdateTodo}
      />
    </Container>
  );
}

export default App;
