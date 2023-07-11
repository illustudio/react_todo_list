import { v4 as uuidv4 } from "uuid";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import styled from "styled-components";
import "open-color/open-color.css";
import { useRef, useState } from "react";

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: 0;
  padding: 0.5rem;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background-color: var(--oc-teal-5);
  box-shadow: 0 0 0 2px var(--oc-teal-6);
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  display: flex;
  border: 0;
  width: 100%;
  box-shadow: 0 0 0 2px var(--oc-teal-6);
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  &:focus {
    box-shadow: 0 0 0 2px var(--oc-teal-8);
    outline: 0;
  }
`;

const Form = ({ onAddWorkHandler }) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  const onInputChangeHandler = (e) => {
    // 작업 저장
    setTodo(e.target.value);
  };

  const onSubmitHandler = (e) => {
    // form은 기본적으로 서버로 데이터를 전송하는 이벤트 속성이 있다.
    // 해당이벤트를 먼저 취소해줘야한다.
    e.preventDefault();
    if (todo === "") {
      return alert("내용을 입력해주세요");
    }
    // change 과정에서 id를 할당하면 키를 입력받는 매 순간마다 id를 새롭게 생성하여 불필요한 일을 많이한다. 최종 아이디는 리스트에 submit 할때 할당한다.
    onAddWorkHandler({ id: uuidv4(), done: false, todo });
    // 입력 후에는 다음 입력을 위해 input을 비워준다.
    setTodo("");
    // 바로 다음 내용을 입력할 수 있도록 포커싱
    inputRef.current.focus();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <InputWrapper>
        <Input
          id="add-todo"
          type="text"
          value={todo}
          ref={inputRef}
          onChange={onInputChangeHandler}
        />
        {/* form 작동시 - 버튼 속성은 꼭 type="submit"인지 확인할것 */}
        <AddButton type="submit">
          <BiSolidMessageSquareAdd />
        </AddButton>
      </InputWrapper>
    </form>
  );
};

export default Form;
