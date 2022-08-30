import styled from "styled-components";

const ModalSmallButton = ({ type, content, onClick, disabled = false }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <StyledButton type={type} disabled={disabled}>
        {content}
      </StyledButton>
    </StyledWrapper>
  );
};

export default ModalSmallButton;

const StyledWrapper = styled.div``;

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
