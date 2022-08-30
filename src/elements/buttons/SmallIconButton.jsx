import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// TODO null visibility: none 차이
const Button = ({ icon, onClick, disabled = false }) => {
  return (
    <Wrapper onClick={!disabled ? onClick : null}>
      <Icon icon={icon} disabled={disabled} size='sm' />
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.div``;

const Icon = styled(FontAwesomeIcon)`
  color: ${(props) =>
    props.disabled ? props.theme.hoverIconColor : props.theme.iconColor};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.hoverIconColor};
    transition: ${(props) => props.theme.transition};
    transform: ${(props) => props.theme.transform};
  }
`;
