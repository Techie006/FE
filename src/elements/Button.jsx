import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// TODO null visibility: none 차이
const Button = ({ type, content, icon, size, onClick, disabled }) => {
  return (
    <Wrapper onClick={onClick}>
      {icon ? <Icon icon={icon} size={size} /> : null}
      {content ? (
        <Btn type={type} size={size} disabled={disabled}>
          {content}
        </Btn>
      ) : null}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.div``;

const Icon = styled(FontAwesomeIcon)`
  color: "#B7BBC7";
  &:hover {
    cursor: pointer;
    color: "#5732fb";
    transition: all 0.3s;
    transform: scale(1, 1);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const Btn = styled.button.attrs((props) => ({
  type: props.type,
  disabled: props.disabled,
}))`
  padding: ${(props) =>
    props.size === "sm"
      ? "5px 10px"
      : props.size === "lg"
      ? "10px 100px"
      : "10px 20px"};
  border-radius: 5px;
  transition: all 0.3s;
  border: none;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  /* // TODO css 효과 */
  &:hover {
    cursor: pointer;
    background-color: "#5732fb";
    color: "#FFFFFF";
  }
`;
