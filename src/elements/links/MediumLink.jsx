import { Link } from "react-router-dom";
import styled from "styled-components";

const MediumLink = ({ content, link, selected = false }) => {
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

export default MediumLink;

const StLink = styled(Link)`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text.gray};
  // TODO hover시 변화?
  background-color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const StText = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text.orange_red};
  background-color: inherit;
  &:hover {
    cursor: default;
  }
`;
