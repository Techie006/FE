import styled from "styled-components";

const UnderlineCategory = ({
  title,
  contents,
  onClick,
  disabledCategory = "",
}) => {
  const categoryItems = contents.map((category, index) => (
    <StyledCategoryItem
      key={index}
      onClick={onClick}
      disabled={category === disabledCategory}
    >
      {category}
    </StyledCategoryItem>
  ));

  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledCategory>{categoryItems}</StyledCategory>
    </StyledWrapper>
  );
};

export default UnderlineCategory;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 0.8rem;
`;

const StyledCategory = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px;
`;

const StyledCategoryItem = styled.button`
  font-size: 0.5rem;
  margin: 5px;
  color: ${(props) => props.theme.categoryItemColor};
  text-align: center;
  border: none;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    color: ${(props) => props.theme.categoryItemHoverColor};
    transition: ${(props) => props.theme.transition};
    transform: ${(props) => props.theme.transform};
  }
`;
