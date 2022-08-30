import styled from "styled-components";

const MediumTextarea = (props) => {
  return <StyledTextarea>{props.children}</StyledTextarea>;
};

export default MediumTextarea;

const StyledTextarea = styled.textarea`
  font-size: 1rem;
  padding: 10px 10px;
  width: 300px;
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
