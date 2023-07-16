import styled from "styled-components";
import ListItem from "./ListItem.jsx";
import PropTypes from "prop-types";
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 0.25rem;
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
`;
const ListItemWrapper = styled.li`
  display: flex;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
  transition: all 200ms ease;
`;

const Nothing = styled.p`
  display: flex;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: var(--oc-gray-0);
  margin: 1rem;
`;
const List = ({ list, onUpdateDone, onRemove, onUpdateTodo }) => {
  // 편집모드 상태
  // 할 일 목록 리스트에 아무 내용이 없을 경우
  if (list.length <= 0) return <Nothing>목록이 없습니다.</Nothing>;

  return (
    <ListContainer>
      {list &&
        list.map((item) => (
          <ListItemWrapper key={item.id}>
            <ListItem
              onUpdateDone={onUpdateDone}
              item={item}
              onUpdateTodo={onUpdateTodo}
              onRemove={onRemove}
            />
          </ListItemWrapper>
        ))}
    </ListContainer>
  );
};

export default List;

List.propTypes = {
  list: PropTypes.array,
  onUpdateDone: PropTypes.func,
  onRemove: PropTypes.func,
  onUpdateTodo: PropTypes.func,
};
