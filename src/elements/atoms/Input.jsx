import styled from "styled-components";

const Input = (props) => {
  return <StInput {...props} />;
};

export default Input;

// TODO 고치기
const StInput = styled.input`
  width: 150px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.boxRadius};
  &:hover {
    cursor: text;
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;
