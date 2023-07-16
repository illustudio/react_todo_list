import { useState } from "react";
import Form from "./components/Form.jsx";
import styled from "styled-components";
import List from "./components/List.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCheckupList } from "react-icons/tb";
const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
const Header = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  backdrop-filter: blur(5px);
  border-bottom: 1px solid var(--oc-gray-1);
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  text-transform: uppercase;
`;
const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;
const TabButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  cursor: pointer;
  gap: 0.5rem;
  transition: all 300ms ease;
  background-color: var(--oc-gray-1);

  &.active {
    font-weight: bold;
    color: white;
    box-shadow: 0 0 0 4px var(--oc-teal-1);
    background-color: var(--oc-teal-5);
  }
`;
const Badge = styled.span`
  display: inline-flex;
  width: 24px;
  height: 24px;
  background-color: var(--oc-gray-7);

  border-radius: 24px;
  color: white;
  align-items: center;
  justify-content: center;
`;
function App() {
  const [todo, setTodo] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = [
    { id: 0, name: "전체", content: todo },
    { id: 1, name: "작업중", content: todo.filter((item) => !item.done) },
    { id: 2, name: "작업완료", content: todo.filter((item) => item.done) },
  ];
  // 작업추가
  const onAddTodo = (newTodo) => {
    setTodo((prevState) => [...prevState, newTodo]);
    // 작업완료 탭이라면 전체 탭으로 이동
    if (currentTab === 2) setCurrentTab(0);
  };

  // 작업삭제
  const onRemove = (id) => {
    const newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
    toast(
      `${todo.find((item) => item.id === id).todo} 작업이 삭제되었습니다.`,
      {
        type: "success",
      }
    );
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
    toast(
      `${
        todo.find((work) => work.id === item.id).todo
      } 작업이 업데이트 되었습니다.`,
      {
        type: "success",
      }
    );
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
    toast(
      `${
        todo.find((work) => work.id === id).todo
      }(으)로 내용이 변경 되었습니다.`,
      {
        type: "success",
      }
    );
  };
  const currentTabHandler = (index) => {
    setCurrentTab(index);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>
            <TbCheckupList color={"var(--oc-teal-6)"} />
            Todo List
          </Title>
          <Tabs>
            {tabs.map((button, index) => (
              <TabButton
                key={button.id}
                onClick={() => currentTabHandler(index)}
                className={index === currentTab ? "active" : ""}
              >
                {button.name.toUpperCase()}{" "}
                <Badge>{tabs[index].content.length}</Badge>
              </TabButton>
            ))}
          </Tabs>
        </Header>
        <List
          list={tabs[currentTab].content}
          onRemove={onRemove}
          onUpdateDone={onUpdateDone}
          onUpdateTodo={onUpdateTodo}
        />
        <Form onAddTodo={onAddTodo} />
      </Container>
      <ToastContainer position="top-right" autoClose="1500" />
    </>
  );
}

export default App;
