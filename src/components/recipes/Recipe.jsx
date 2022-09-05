import { useState } from "react";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import SmallIconButton from "../../elements/buttons/SmallIconButton";

// TODO isbookmarked!
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
  const [bookmark, setBookmark] = useState(is_liked);

  const ingredientList = ingredients.slice(0, 3).join(" ");

  const clickHandler = async () => {
    setBookmark((prev) => !prev);

    if (!bookmark) {
      // const resp = RESP_CHAE.RECIPES.LIKE_RECIPE_SUCCESS;
      // const resp = RESP_CHAE.RECIPES.LIKE_RECIPE_FAIL;
      // const resp = await apis.like_recipe({ id });
      return;
    }

    // const resp = RESP_CHAE.RECIPES.UNLIKE_RECIPE_SUCCESS;
    // const resp = await apis.unlike_recipe({ id });
  };

  return (
    <StWrapper>
      <div onClick={() => onClick(id)}>{recipe_name}</div>
      <div>{ingredientList}</div>
      <SmallIconButton
        icon={faBookmark}
        onClick={clickHandler}
        isActive={bookmark}
      />
      <StImg src={final_img} alt={recipe_name} />
      <div>조리방법: {method}</div>
      <div>카테고리: {category}</div>
      <div>열량: {calorie}</div>
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
  height: 200px;
`;
