import styled from "styled-components";
import ListItem from "./ListItem.jsx";

const Container = styled.li`
  display: flex;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
`;

const List = ({ list, onUpdateDone, onRemove, onUpdateTodo }) => {
  // 편집모드 상태
  // 할 일 목록 리스트에 아무 내용이 없을 경우
  if (list.length <= 0) return <p>목록이 없습니다.</p>;

  return (
    <ul>
      {list &&
        list.map((item) => (
          <Container key={item.id}>
            <ListItem
              onUpdateDone={onUpdateDone}
              item={item}
              onUpdateTodo={onUpdateTodo}
              onRemove={onRemove}
            />
          </Container>
        ))}
    </ul>
  );
};

export default List;
