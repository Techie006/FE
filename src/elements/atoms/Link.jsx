import { Link as DOMLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ content, link, selected = false, ...props }) => {
  return (
    <div {...props}>
      {!selected ? (
        <StLink to={link}>{content}</StLink>
      ) : (
        <StText>{content}</StText>
      )}
    </div>
  );
};

export default Link;

const StLink = styled(DOMLink)`
  background-color: inherit;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-decoration: none;
  color: #656565;
  &:hover {
    cursor: pointer;
    color: #fc9700;
    text-decoration: none;
  }
`;

const StText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: #fc9700;
  &:hover {
    cursor: default;
  }
`;
