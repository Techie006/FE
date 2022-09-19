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
  color: ${(props) => props.theme.colors.font.gray2};
  background-color: inherit;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const StText = styled.div`
  font-weight: 700;
  font-size: "14px";
  line-height: "20px";
  letter-spacing: "-0.5px";
  color: ${(props) => props.theme.colors.main.orange};
  background-color: inherit;
  &:hover {
    cursor: default;
  }
`;
