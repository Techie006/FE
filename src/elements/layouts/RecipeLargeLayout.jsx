import styled from "styled-components";

const RecipeLargeLayout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default RecipeLargeLayout;

const StyledLayout = styled.div`
  font-size: 1rem;
  padding: 10px 10px;
  width: 500px;
  border-radius: ${(props) => props.theme.boxRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-color: ${(props) => props.theme.borderColor};
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.borderHoverColor};
  }
`;