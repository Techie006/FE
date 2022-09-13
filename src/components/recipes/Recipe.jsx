import styled from "styled-components";

import BookmarkBtn from "../common/BookmarkBtn";

const Recipe = ({
  id,
  recipe_name,
  ingredients,
  final_img,
  method,
  category,
  calorie,
  is_liked,
  onClick,
}) => {
  const ingredientList = ingredients.slice(0, 3).join(" ");

  return (
    <StWrapper>
      <BookmarkBtn is_liked={is_liked} />
      <StImg src={final_img} alt={recipe_name} />
      <div onClick={() => onClick({ id, recipe_name })}>{recipe_name}</div>
      <div>{ingredientList}</div>
      <div>
        {method} | {category} | {calorie}
      </div>
    </StWrapper>
  );
};

export default Recipe;

const StWrapper = styled.div`
  box-sizing: border-box;
  padding: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

const StImg = styled.img`
  width: 200px;
  height: 150px;
`;