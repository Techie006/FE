import styled from "styled-components";

const SmallTextarea = (props) => {
  return <StyledTextarea>{props.children}</StyledTextarea>;
};

export default SmallTextarea;

const StyledTextarea = styled.textarea`
  font-size: 1rem;
  padding: 10px 10px;
  width: 150px;
  resize: none;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.boxRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-color: ${(props) => props.theme.borderColor};
  &:hover {
    cursor: text;
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;
