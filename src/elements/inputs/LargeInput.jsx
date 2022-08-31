import styled from "styled-components";

const LargeInput = ({ type, defaultValue, placeholder }) => {
  return <StyledInput type={type} placeholder={placeholder} />;
};

export default LargeInput;

const StyledInput = styled.input`
  width: 300px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.boxRadius};
  &:hover {
    cursor: text;
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;
