import styled from "styled-components";

const Input = (props) => {
  return <StInput {...props} />;
};

export default Input;

const StInput = styled.input`
  display: block;
  margin: auto;
  width: calc(100% - 120px);
  // layout
  background: ${(props) => props.theme.input.layout.background};
  border: ${(props) => props.theme.input.layout.border};
  border-radius: ${(props) => props.theme.input.layout.borderRadius};

  // content
  font-size: ${(props) => props.theme.input.content.fontSize};
  font-weight: ${(props) => props.theme.input.content.fontHeight};
  line-height: ${(props) => props.theme.input.content.lineHeight};

  // colors
  color: ${(props) => props.theme.input.colors.text};

  &:hover {
    cursor: text;
  }
`;
