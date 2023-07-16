import { useCallback, useState } from "react";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { FiDelete, FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";
const Container = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  transition: all 200ms ease;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  &.done {
    background-color: var(--oc-gray-1);
  }
  &:hover {
    background-color: var(--oc-teal-1);
  }
`;
const ListNameWrapper = styled.span`
  display: flex;
  flex-basis: 100%;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 1rem;
  transition: 300ms;
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
  width: 36px;
  height: 36px;
  background-color: ${(props) =>
    props.$bgColor ? props.$bgColor : "var(--oc-teal-4)"};
  border: 0;
  color: white;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  cursor: pointer;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;
const Input = styled.input`
  padding: 1rem;
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
`;
const InputButton = styled.button`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background-color: var(--oc-gray-7);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
`;
const FormContainer = styled.form`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
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

  const onUpdateHandler = (e) => {
    e.preventDefault();
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
      <FormContainer onSubmit={onUpdateHandler}>
        <Input value={todo} type="text" onChange={onChangeHandler} />
        <InputButton type="submit">update</InputButton>
      </FormContainer>
    );
  }

  return (
    <Container className={item.done ? "done" : ""}>
      <ListNameWrapper onClick={() => onUpdateDone(item)}>
        {/*  done 여부에 따라 아이콘 적용*/}
        {!item.done ? <BsCheckSquare /> : <BsCheckSquareFill />}

        <ListName $isDone={item.done}>{item.todo}</ListName>
      </ListNameWrapper>
      <ButtonGroup>
        <IconButton
          type="button"
          onClick={onEditHandler}
          $bgColor={"var(--oc-gray-7)"}
        >
          <FiEdit />
        </IconButton>
        <IconButton
          type="button"
          onClick={() => onRemove(item.id)}
          $bgColor={"var(--oc-red-5)"}
        >
          <FiDelete />
        </IconButton>
      </ButtonGroup>
    </Container>
  );
};

export default ListItem;

ListItem.propTypes = {
  item: PropTypes.object,
  onUpdateDone: PropTypes.func,
  onUpdateTodo: PropTypes.func,
  onRemove: PropTypes.func,
};
