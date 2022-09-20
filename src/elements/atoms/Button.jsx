import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Button = ({
  type,
  page,
  isBasic = true,
  isLarge = false,
  isIcon = false,
  icon,
  size = "s1",
  content,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <div {...props}>
      <StWrapper onClick={onClick}>
        {!isIcon ? (
          <StButton
            type={type}
            page={page}
            isBasic={isBasic}
            disabled={disabled}
          >
            <StContent page={page} isBasic={isBasic}>
              {content}
            </StContent>
          </StButton>
        ) : null}
        {isIcon ? (
          <StLayout>
            <StIcon icon={icon} size={size} />
          </StLayout>
        ) : null}
      </StWrapper>
    </div>
  );
};

export default Button;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

// TODO attrs 없애기?
const StButton = styled.button.attrs((props) => ({
  type: props.type,
  disabled: props.disabled,
}))`
  // layout
  background: ${(props) => {
    if (props.disabled) {
      return props.theme.button.colors.disabled;
    }
    let key = !props.isBasic ? "basic" : "selected";
    return props.theme.button[props.page].colors[key].background;
  }};
  border: ${(props) => {
    if (props.page === "auth" || props.page === "calendar") {
      return props.theme.button[props.page].layout.border;
    }
    return props.theme.button.layout.border;
  }};
  border-radius: ${(props) => {
    if (props.page === "statistics") {
      return props.theme.button.layout.borderRoundRadius;
    }
    return props.theme.button.layout.borderRadius;
  }};
  box-shadow: ${(props) => props.theme.button.layout.boxShadow};

  // effects
  transition: ${(props) => props.theme.effects.transition};

  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "default")};
  }
`;

const StContent = styled.div`
  // content
  font-size: ${(props) => {
    if (props.page === "auth") {
      let key = !props.isLarge ? "basic" : "large";
      return props.theme.button[props.page][key].content.fontSize;
    }
    return props.theme.button[props.page].content.fontSize;
  }};
  font-weight: ${(props) => {
    if (props.theme.button[props.page] === "auth") {
      let key = !props.isLarge ? "basic" : "large";
      return props.theme.button[props.page][key].content.fontWeight;
    }
    return props.theme.button[props.page].content.fontWeight;
  }};
  line-height: ${(props) => {
    if (props.theme.button[props.page] === "auth") {
      let key = !props.isLarge ? "basic" : "large";
      return props.theme.button[props.page][key].content.lineHeight;
    }
    return props.theme.button[props.page].content.lineHeight;
  }};

  // colors
  background: inherit;
  color: ${(props) => {
    let key = !props.isBasic ? "basic" : "selected";
    return props.theme.button[props.page].colors[key].text;
  }};
`;

const StLayout = styled.div`
  background: ${(props) => props.theme.iconbox.background};
  border-radius: ${(props) => {
    if (props.page === "calendar") {
      return props.theme.iconbox.layout.borderRoundRadius;
    }
    return props.theme.iconbox.layout.borderRadius;
  }};
  box-shadow: ${(props) => props.theme.iconbox.boxShadow};
`;

const StIcon = styled(FontAwesomeIcon).attrs((props) => ({
  size: props.size,
  color: props.theme.iconbox.colors.color,
}))`
  font-size: ${(props) => props.theme.iconbox.content.fontSize};
  font-size: ${(props) => props.theme.iconbox.content.fontWeight};
  font-size: ${(props) => props.theme.iconbox.content.lineHeight};
`;
