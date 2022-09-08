import styled from "styled-components";

const SmallButton = ({ type, content, onClick, disabled = false }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <StyledButton type={type} disabled={disabled}>
        {content}
      </StyledButton>
    </StyledWrapper>
  );
};

export default SmallButton;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const StyledButton = styled.button.attrs((props) => ({
  type: props.type,
  disabled: props.disabled,
}))`
  font-size: 0.7rem;
  padding: 10px 5px;
  box-sizing: border-box;
  border: none;
  border-radius: ${(props) => props.theme.boxRadius};
  transition: ${(props) => props.theme.transition};
  box-shadow: ${(props) => props.theme.boxShadow};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.hoverButtonColor};
    color: ${(props) => props.theme.hoverButtonTextColor};
  }
`;
