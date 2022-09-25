import styled from "styled-components";

import { R0, R4 } from "../../styles/Radius";

const IconBox = ({
  border = "",
  background = "",
  isCircle,
  onClick,
  ...props
}) => {
  return (
    <div style={{ ...props }}>
      <StLayout
        border={border}
        background={background}
        isCircle={isCircle}
        onClick={onClick}
      >
        {props.children}
      </StLayout>
    </div>
  );
};

export default IconBox;

const StLayout = styled.div`
  border: ${(props) => props.border};
  background: ${(props) => props.background};
  border-radius: ${(props) => (props.isCircle ? R0 : R4)};
`;
