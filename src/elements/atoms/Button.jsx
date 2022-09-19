import styled from "styled-components";

// TODO
const Button = ({
  type,
  page,
  isBasic,
  icon,
  content,
  onClick,
  disabled = false,
}) => {
  return (
    <StWrapper onClick={onClick}>
      <StButton type={type} page={page} isBasix={isBasic} disabled={disabled}>
        {content}
      </StButton>
    </StWrapper>
  );
};

export default Button;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const StButton = styled.button.attrs((props) => ({
  type: props.type,
  disabled: props.disabled,
}))`
  /* font-size: 0.7rem;
  padding: 10px 5px;
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => props.theme.boxRadius};
  transition: ${(props) => props.theme.transition};
  box-shadow: ${(props) => props.theme.boxShadow}; */
  &:hover {
    cursor: pointer;
    /* background-color: ${(props) => props.theme.hoverButtonColor};
    color: ${(props) => props.theme.hoverButtonTextColor}; */
  }
`;
