import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { R0, R4 } from "../../styles/Radius";

const IconBox = ({ isCircle, onClick, page, func, ...props }) => {
  let width = "";
  let height = "";
  let border = "";
  let background = "";

  const createStyle = () => {
    switch (page) {
      case "calendar":
        if (func === "prev" || func === "next") {
          width = 28;
          height = 28;
          border = "1px solid #ECECEC";
          background = "#FAFAFA";
        }
        break;
      default:
        return;
    }
  };

  createStyle();

  return (
    <div style={{ ...props }}>
      <StLayout
        width={width}
        height={height}
        border={border}
        background={background}
        isCircle={isCircle}
        onClick={onClick}
      >
        <StViewBox>{props.children}</StViewBox>
      </StLayout>
    </div>
  );
};

export default IconBox;

const StLayout = styled.div`
  align-items: center;
  border: ${(props) => props.border};
  background: ${(props) => props.background};
  border-radius: ${(props) => (props.isCircle ? R0 : R4)};

  &:hover {
    cursor: pointer;
  }
`;

// SVG는 뷰박스 크기에 맞춰 꽉 채워짐
const StViewBox = styled.div`
  width: 18px;
  height: 18px;
`;
