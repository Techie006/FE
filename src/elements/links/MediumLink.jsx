import { Link } from "react-router-dom";
import styled from "styled-components";

const MediumLink = ({ content, link }) => {
  return <StyledLink to={link}>{content}</StyledLink>;
};

export default MediumLink;

const StyledLink = styled(Link)`
  font-size: 0.7rem;
  text-decoration: none;
  color: ${(props) => props.theme.mediumLinkColor};
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
