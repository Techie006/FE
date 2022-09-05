import { Link } from "react-router-dom";
import styled from "styled-components";

const Recipe = ({
  id,
  recipe_name,
  ingredients,
  final_img,
  method,
  category,
  calorie,
  onClick,
}) => {
  const ingredientList = ingredients.slice(0, 3).join(" ");

  return (
    <StWrapper onClick={() => onClick(id)}>
      <div>{recipe_name}</div>
      <div>{ingredientList}</div>
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
