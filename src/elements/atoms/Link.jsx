import { Link as DOMLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ content, link, selected = false }) => {
  return (
    <>
      {!selected ? (
        <StLink to={link}>{content}</StLink>
      ) : (
        <StText>{content}</StText>
      )}
    </>
  );
};

export default Link;

const StLink = styled(DOMLink)`
  font-weight: ${(props) => props.theme.link.content.fontWeight};
  font-size: ${(props) => props.theme.link.content.fontSize};
  line-height: ${(props) => props.theme.link.content.lineHeight};
  letter-spacing: ${(props) => props.theme.link.content.letterSpacing};
  color: ${(props) => props.theme.link.colors.basic.text};
  background-color: inherit;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StText = styled.div`
  font-weight: ${(props) => props.theme.link.content.fontWeight};
  font-size: ${(props) => props.theme.link.content.fontSize};
  line-height: ${(props) => props.theme.link.content.lineHeight};
  letter-spacing: ${(props) => props.theme.link.content.letterSpacing};
  color: ${(props) => props.theme.link.colors.selected.text};
  background-color: inherit;
  &:hover {
    cursor: default;
  }
`;
