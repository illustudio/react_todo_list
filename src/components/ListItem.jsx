import { useState } from "react";
import { BsCheckSquare, BsCheckSquareFill } from "react-icons/bs";
import styled from "styled-components";
import { FiDelete, FiEdit } from "react-icons/fi";

const ListName = styled.div`
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
`;
const ListItemName = styled.div`
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
const ListItem = ({ onUpdate, item, updateTodo, onDeleteHandler }) => {
  const [todo, setTodo] = useState(item.todo);
  const [edit, setEdit] = useState(false);
  const onEditHandler = () => {
    setEdit(!edit);
  };
  const onChangeHandler = (e) => {
    setTodo(e.target.value);
  };
  const onUpdateHandler = () => {
    updateTodo(item.id, todo);
    setEdit(!edit);
  };
  /* 클릭시 done 상태 변화*/
  if (edit) {
    return (
      <>
        <input value={todo} type="text" onChange={onChangeHandler} />
        <button type="button" onClick={onUpdateHandler}>
          update
        </button>
      </>
    );
  }
  return (
    <ListName>
      <ListNameWrapper onClick={() => onUpdate(item)}>
        {/*  done 여부에 따라 아이콘 적용*/}
        {!item.done ? <BsCheckSquare /> : <BsCheckSquareFill />}

        <ListItemName $isDone={item.done}>{item.todo}</ListItemName>
      </ListNameWrapper>
      <ButtonGroup>
        <IconButton onClick={onEditHandler}>
          <FiEdit />
        </IconButton>
        <IconButton onClick={() => onDeleteHandler(item.id)}>
          <FiDelete />
        </IconButton>
      </ButtonGroup>
    </ListName>
  );
};

export default ListItem;
