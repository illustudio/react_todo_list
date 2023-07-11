import { useState } from "react";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { FiDelete, FiEdit } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const ListNameWrapper = styled.span`
  display: flex;
  flex-basis: 100%;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  transition: 300ms;
  &:hover {
    background-color: var(--oc-gray-3);
  }
`;
const ListName = styled.div`
  display: flex;
  width: 100%;
  text-decoration: ${(props) => props.$isDone && "line-through"};
  user-select: none;
  opacity: ${(props) => (props.$isDone ? "0.5" : "1")};
`;
const IconButton = styled.button`
  display: inline-flex;
  width: 48px;
  height: 48px;
  background-color: transparent;
  border: 1px solid var(--oc-gray-3);
  align-items: center;
  justify-content: center;
  border-radius: 48px;
  cursor: pointer;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;
const Input = styled.input`
  padding: 1rem;
  width: 100%;
  display: flex;
  border-radius: 1rem;
  border: 1px solid #ddd;
`;
const InputButton = styled.button`
  display: flex;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
const FormContainer = styled.form`
  display: flex;
  width: 100%;
`;
const ListItem = ({ onUpdateDone, item, onUpdateTodo, onRemove }) => {
  const [todo, setTodo] = useState(item.todo);
  const [edit, setEdit] = useState(false);
  const onEditHandler = () => {
    setEdit(!edit);
  };
  const onChangeHandler = (e) => {
    // input에 변경된 내용 바인딩
    setTodo(e.target.value);
  };
  const onUpdateHandler = () => {
    // 기존 내용과 차이가 없을 경우 edit mode 종료
    if (todo === item.todo) {
      return setEdit(!edit);
    }
    // 변경된 내용과 아이디 전달
    onUpdateTodo(item.id, todo);
    // edit mode 종료
    setEdit(!edit);
  };
  /* 클릭시 done 상태 변화*/
  if (edit) {
    return (
      <FormContainer>
        <Input value={todo} type="text" onChange={onChangeHandler} />
        <InputButton type="submit" onClick={onUpdateHandler}>
          update
        </InputButton>
      </FormContainer>
    );
  }
  return (
    <Container>
      <ListNameWrapper onClick={() => onUpdateDone(item)}>
        {/*  done 여부에 따라 아이콘 적용*/}
        {!item.done ? <BsCheckSquare /> : <BsCheckSquareFill />}

        <ListName $isDone={item.done}>{item.todo}</ListName>
      </ListNameWrapper>
      <ButtonGroup>
        <IconButton onClick={onEditHandler}>
          <FiEdit />
        </IconButton>
        <IconButton onClick={() => onRemove(item.id)}>
          <FiDelete />
        </IconButton>
      </ButtonGroup>
    </Container>
  );
};

export default ListItem;
