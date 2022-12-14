import styled from "styled-components";

import Button from "../atoms/Button";

const Category = ({
  contents,
  onClick,
  page,
  func,
  selectedCategory = "",
  ...props
}) => {
  const categoryItems = contents.map((category, idx) => (
    <Button
      key={idx}
      type='button'
      content={category}
      onClick={onClick}
      page={page}
      func={func}
      disabled={category === selectedCategory}
      isSelected={category === selectedCategory}
    />
  ));

  return <StWrapper style={{ ...props }}>{categoryItems}</StWrapper>;
};

export default Category;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
`;
