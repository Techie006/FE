import styled from "styled-components";

const Button = ({
  type,
  content,
  onClick,
  page,
  func,
  disabled = false, // 버튼이 활성화 상태인지 아닌지
  isSelected = false, // 버튼이 선택된 상태인지 아닌지
  ...props
}) => {
  let layoutStyle = {};
  let contentStyle = {};

  // 각 페이지 별 기능에 맞는 버튼 스타일 생성 함수
  const createStyle = () => {
    // size
    let width = "";
    let height = "";

    // layout
    let background = "";
    let border = "";
    let borderRadius = "";
    let padding = "";
    let hoverBackground = "";

    // content
    let fontWeight = "";
    let fontSize = "";
    let lineHeight = "";
    let color = "";
    let hoverColor = "";

    switch (page) {
      case "auth":
        if (func === "signup" || func === "signin") {
          borderRadius = "6px";
          width = "329px";
          height = "50px";
          // padding = "11px 129px";

          fontWeight = "700";
          fontSize = "19px";
          lineHeight = "28px";

          if (!disabled) {
            border = "1px solid #F07401";
            background = "#FC9700";
            color = "#FAFAFA";
            hoverBackground = "#F07401";
            hoverColor = "#FAFAFA";
          } else {
            border = "1px solid #FFEAD8";
            background = "#FFEAD8";
            color = "#FAFAFA";
            hoverBackground = "#FFEAD8";
            hoverColor = "#FAFAFA";
          }
        }
        break;
      case "statistics":
        if (func === "filter") {
          border = "none";
          borderRadius = "30px";
          padding = "2px 10px";

          fontWeight = "500";
          fontSize = "10px";
          lineHeight = "18px";

          if (!isSelected) {
            background = "#F0EADC";
            color = "#8E7B6D";
            hoverBackground = "#F0EADC";
            hoverColor = "#8E7B6D";
          } else {
            background = "#FFB356";
            color = "#482647";
            hoverBackground = "#FFB356";
            hoverColor = "#482647";
          }
        }
        if (func === "helper") {
          border = "none";
          borderRadius = "6px";
          background = "#FFB356";
          hoverBackground = "#FFB356";
          padding = "10px 15px";

          fontWeight = "700";
          fontSize = "16px";
          lineHeight = "23px";
          color = "#FFFFFF";
          hoverColor = "#FFFFFF";
        }
        break;
      case "calendar":
        if (func === "view") {
          border = "1px solid #ECECEC";
          borderRadius = "4px";
          padding = "5px 6px";
          background = "#FAFAFA";
          hoverBackground = "#DEDEDE";

          fontWeight = "500";
          fontSize = "10px";
          lineHeight = "14px";
          color = "#5B5B5B";
          hoverColor = "#5B5B5B";
        }
        break;
      case "classes":
        if (func === "create") {
          border = "0.5px solid #ECECEC";
          borderRadius = "6px";
          background = "#FFB356";
          hoverBackground = "#FC9700";
          width = "93px";
          height = "36px";

          fontWeight = 700;
          fontSize = "14px";
          lineHeight = "16px";
          color = "#FFFFFF";
          hoverColor = "#482647";
        }
        break;
      case "class":
        if (func === "leave") {
          border = "0.5px solid #ECECEC";
          borderRadius = "6px";
          background = "#FAFAFA";
          hoverBackground = "#EFEFEF";
          width = "86px";
          height = "36px";

          fontWeight = 700;
          fontSize = "14px";
          lineHeight = "16px";
          color = "#656565";
          hoverColor = "#FF8E42";
        }
        break;
      case "modal":
        if (func === "time") {
          borderRadius = "30px";
          width = "52px";
          height = "40px";

          fontWeight = 500;
          fontSize = "14px";
          lineHeight = "20px";

          if (!isSelected) {
            border = "0.6px solid #DADADA";
            background = "#FAFAFA";
            color = "#A5A5A5";
            hoverBackground = "#FAFAFA";
            hoverColor = "#A5A5A5";
          } else {
            border = "0.6px solid #FFA842";
            background = "#FFB356";
            color = "#482647";
            hoverBackground = "#FFB356";
            hoverColor = "#482647";
          }
        } else if (func === "create") {
          border = "none";
          borderRadius = "8px";
          background = "#FFDD7C";
          hoverBackground = "#FFB356";
          width = "123px";
          height = "36px";

          fontWeight = 700;
          fontSize = "14px";
          lineHeight = "16px";
          color = "#664500";
          hoverColor = "#482647";
        }
        break;
        
      default:
        return;
    }

    layoutStyle = {
      width,
      height,
      background,
      border,
      borderRadius,
      padding,
      hoverBackground,
    };
    contentStyle = { fontWeight, fontSize, lineHeight, color, hoverColor };
  };

  createStyle();

  return (
    <div style={{ ...props }}>
      <StClickLayout onClick={onClick}>
        <StButton type={type} disabled={disabled} {...layoutStyle}>
          <StContent {...contentStyle}>{content}</StContent>
        </StButton>
      </StClickLayout>
    </div>
  );
};

export default Button;

const StClickLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0px;
  gap: 12px;
`;

const StButton = styled.button.attrs((props) => ({
  type: props.type,
  disabled: props.disabled,
}))`
  // layout
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  padding: ${(props) => props.padding};

  // effects
  transition: ${(props) => props.theme.effects.transition};

  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "default")};
    background: ${(props) => props.hoverBackground};
  }
`;

const StContent = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;

  // content
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};

  // colors
  background: inherit;
  color: ${(props) => props.color};

  &:hover {
    color: ${(props) => props.hoverColor};
  }
`;
