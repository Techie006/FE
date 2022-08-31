import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// TODO border 선 있는지 없는지는 디자인에 따라 변경
const InputWithIcon = ({ type, placeholder, icon }) => {
  return (
    <StyledWrapper>
      <StyledIcon icon={icon} size='sm' />
      <StyledInput type={type} placeholder={placeholder} />
    </StyledWrapper>
  );
};

export default InputWithIcon;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.iconColor};
  padding: 0px 3px;
`;

const StyledInput = styled.input`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => props.theme.boxRadius};
  &:hover {
    cursor: text;
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;
