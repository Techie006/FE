import React, { useState, useEffect } from "react";

import Recipes from "./Recipes";
import axios from "axios";
import styled from "styled-components";

const RecommendRecipes = () => {
  const [warningIngredient, setWarningIngredient] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);

  const auth = localStorage.getItem("Authorization");
  const refresh = localStorage.getItem("Refresh_Token");

  var inHurryFoodName = warningIngredient.map((data) => data.food_name);

  const onClickHandler = async (e) => {
    const buttonValue = e.target.value;
    console.log("buttonValue", buttonValue);
    console.log("warningIngredient",warningIngredient)
    try {
      const resp = await axios.post(
        "http://3.36.56.125/api/recipes/recommend",
        {
          base: buttonValue,
          // mark_name 드리면됨
          foods: inHurryFoodName,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      console.log("recipesData", resp.data.content.recipes);
      setShowRecipes(resp.data.content.recipes);
      console.log("qqqq", showRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarningIngredients = async () => {
    const resp = await axios.get("http://3.36.56.125/api/ingredients/warning", {
      headers: {
        Authorization: auth,
        Refresh_Token: refresh,
      },
    });
    console.log("in_hurry", resp.data.content.in_hurry);
    setWarningIngredient(resp.data.content.in_hurry);
  };

  console.log("inHurryFoodName", inHurryFoodName);

  useEffect(() => {
    getWarningIngredients();
  }, []);

  return (
    <StyledRecipesWrapper>
      <StyledHeader>추천 레시피</StyledHeader>
      <StyledButtonWrapper>
        {warningIngredient &&
          warningIngredient.map((data, index) => (
            <StyledButtonScroll key={index}>
              <StyledIngredientButton
                onClick={onClickHandler}
                value={data.food_name}
              >
                {data.food_name}
              </StyledIngredientButton>
            </StyledButtonScroll>
          ))}
      </StyledButtonWrapper>
      <StyledRecipes>
        {showRecipes &&
          showRecipes.map((data, index) => (
            <StyledRecipe key={index}>
              <StyledRecipeTitle>{data.recipe_name}</StyledRecipeTitle>
              {/* <StyledDay>{data.method}</StyledDay> */}
            </StyledRecipe>
          ))}
      </StyledRecipes>
      <Recipes />
    </StyledRecipesWrapper>
  );
};

export default RecommendRecipes;

const StyledRecipesWrapper = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 540px;
`;
const StyledHeader = styled.div`
  border: 1px solid black;
`;
const StyledButtonWrapper = styled.span`
  display: flex;
  flex-direction: row;
  width: 348px;
  padding: 5px;
  border: 1px solid black;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const StyledIngredientButton = styled.button`
  width: 80px;
  height: 50px;
  font-size: 10px;
  margin: 5px;
`;
const StyledButtonScroll = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledRecipes = styled.div`
  display: flex;
  flex-direction: column;
  margin : 5px auto;
  width: 340px;
  height: 430px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;
const StyledRecipe = styled.div`
  border: 1px solid black;
  margin-bottom : 5px;

`;
const StyledRecipeTitle = styled.div`

  width: 300px;
  height: 20px;
  
`;
const StyledMethod = styled.div`

  width: 100px;
  height: 20px;
  
`;
