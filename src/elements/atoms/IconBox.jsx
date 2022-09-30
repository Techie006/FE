import styled from "styled-components";

import { R0, R4 } from "../../styles/Radius";

const IconBox = ({
  isBox = true,
  isCircle = false,
  onClick,
  page,
  func,
  ...props
}) => {
  let width = "";
  let height = "";
  let border = "";
  let background = "";
  let viewBoxWidth = "";
  let viewBoxHeight = "";

  const createStyle = () => {
    switch (page) {
      case "calendar":
        if (func === "prev" || func === "next") {
          width = "28px";
          height = "28px";
          border = "1px solid #ECECEC";
          background = "#FAFAFA";
          viewBoxWidth = "18px";
          viewBoxHeight = "18px";
        } else if (func === "create") {
          width = "36px";
          height = "36px";
          border = "1px solid #ECECEC";
          background = "#FAFAFA";
          viewBoxWidth = "24px";
          viewBoxHeight = "24px";
        } else if (func === "bookmark" || func === "edit") {
          width = "24px";
          height = "24px";
          border = "";
          background = "";
          viewBoxWidth = "22px";
          viewBoxHeight = "22px";
        }
        break;
      case "modal":
        if (func === "close") {
          width = "22px";
          height = "22px";
          border = "1px solid #DFDFE6";
          background = "#FFFFF";
          viewBoxWidth = "7px";
          viewBoxHeight = "7px";
        }
        break;
      case "class":
        if (func === "send") {
          width = "22px";
          height = "22px";
          border = "";
          background = "";
          viewBoxWidth = "22px";
          viewBoxHeight = "22px";
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
        isBox={isBox}
        onClick={onClick}
      >
        <StViewBox width={viewBoxWidth} height={viewBoxHeight}>
          {props.children}
        </StViewBox>
      </StLayout>
    </div>
  );
};

export default IconBox;

const StLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
  background: ${(props) => props.background};
  border-radius: ${(props) => (props.isCircle ? R0 : R4)};

  &:hover {
    cursor: pointer;
    background: ${(props) => (props.isBox ? "#DEDEDE" : props.background)};
    svg {
      fill: ${(props) => (props.isBox ? "#656565" : "#ff8e42")};
    }
  }
`;

// SVG는 ViewBox에 꽉 채워짐
const StViewBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
