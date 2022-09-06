import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = ({ icon, onClick, disabled = false, isactive = false }) => {
  return (
    <Wrapper onClick={!disabled ? onClick : null}>
      <Icon
        icon={icon}
        disabled={disabled}
        size='sm'
        isactive={isactive ? 1 : 0}
      />
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.div``;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.disabled || props.isactive
      ? props.theme.hoverIconColor
      : props.theme.iconColor};
  &:hover {
    cursor: pointer;
    transform: ${(props) => props.theme.transform};
  }
`;
