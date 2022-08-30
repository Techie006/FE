import styled from "styled-components";
import { Link } from "react-router-dom";

const SmallLink = ({ content, link }) => {
  return <StyledLink to={link}>{content}</StyledLink>;
};

export default SmallLink;

const StyledLink = styled(Link)`
  font-size: 0.5rem;
  text-decoration: none;
  color: ${(props) => props.theme.smallLinkColor};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
