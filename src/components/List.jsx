import styled from "styled-components";
import ListItem from "./ListItem.jsx";

const ListWrapper = styled.li`
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
`;

const List = ({ list, onUpdate, onRemove, onUpdateTodo }) => {
  // 편집모드 상태
  // 할 일 목록 리스트에 아무 내용이 없을 경우
  if (list.length <= 0) return <p>목록이 없습니다.</p>;

  // 삭제 이벤트 핸들러
  const onDeleteHandler = (id) => {
    onRemove(id);
  };
  const updateTodo = (id, content) => {
    onUpdateTodo(id, content);
  };

  return (
    <ul>
      {list &&
        list.map((item) => (
          <ListWrapper key={item.id}>
            <ListItem
              onUpdate={onUpdate}
              item={item}
              updateTodo={updateTodo}
              onDeleteHandler={onDeleteHandler}
            />
          </ListWrapper>
        ))}
    </ul>
  );
};

export default List;
