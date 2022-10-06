import React, { useState, useEffect } from "react";

// import BookmarkBtn from "../common/BookmarkBtn";
// import IconBox from "../../elements/atoms/IconBox";
import BookmarkBtn from "../common/BookmarkBtn";
import axios from "axios";
import styled from "styled-components";
import { faColonSign } from "@fortawesome/free-solid-svg-icons";

const RecommendRecipes = () => {
  const [warningIngredient, setWarningIngredient] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);
  console.log("showre",showRecipes)

  const auth = localStorage.getItem("Authorization");
  const refresh = localStorage.getItem("Refresh_Token");

  var inHurryFoodName = warningIngredient.map((data) => data.food_name);

  const onClickHandler = async (e) => {
    const buttonValue = e.target.value;
    console.log("buttonValue", buttonValue);
    console.log("warningIngredient",warningIngredient)
    try {
      const resp = await axios.post(
        "https://magorosc.shop/api/recipes/recommend",
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
    const resp = await axios.get("https://magorosc.shop/api/ingredients/warning", {
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

  const commonIngredients = showRecipes.map((data, index) => (
    <StRestIngredients key={index}>{data.common_ingredients}</StRestIngredients>
  ))

  const commonIngredient = commonIngredients.map((data, index) => (
    <StRestIngredients>{data.common_ingredients}</StRestIngredients>
  ))
  

  return (
    <StRecipesWrapper>
      <StHeader>
        <StTitle>추천 레시피</StTitle>
        <StSubTitle>유통기한 임박재료의 레시피를 추천해드려요!</StSubTitle>
      </StHeader>
      <StButtonWrapper>
      <StButtonList>
        {warningIngredient &&
          warningIngredient.map((data, index) => (
            <StButtonScroll key={index}>
              <StIngredientButton
                onClick={onClickHandler}
                value={data.mark_name}
              >
                {data.mark_name}
              </StIngredientButton>
            </StButtonScroll>
          ))}
      </StButtonList>
      </StButtonWrapper>
      <StRecipes>
        {showRecipes &&
          showRecipes.map((data, index) => (
            <StRecipe 
            key={index}
            // onClick={getDtailRecipe}
            value={data.id}>
              <StRecipeImg src = {data.recipe_image}/>
              <StRecipeDesc>
              <StIngreWrapper>
                <div className="ingredients">{data.common_ingredients.map((data) => <StRestIngredients>{data}</StRestIngredients> )}</div>
                <BookmarkBtn className="bookmark" recipe_id={data.id} is_liked={data.liked} isBox={false} />
              </StIngreWrapper>
              <StRecipeTitle>{data.recipe_name}</StRecipeTitle>
              <StDay>{data.method} | {data.category} | {data.calorie}kcal</StDay>
              </StRecipeDesc>

              {/* <BookmarkBtn recipe_id={data.id} is_liked={data.liked} isBox={true} />
              <IconBox page="calendar" func="bookmark" isBox={true}>
                <Test fill="#A5A5A5" />
              </IconBox> */}
            </StRecipe>
          ))}
      </StRecipes>
    </StRecipesWrapper>
  );
};

export default RecommendRecipes;

const StRecipesWrapper = styled.div`
  border: 1px solid black;
  padding : 20px;
  height : 726px;
  border : 0px;
  border-radius : 10px;
  box-shadow : ${(props) => props.theme.section.layout.boxShadow};
  background-color : ${(props) => props.theme.section.layout.background};
  .ingredients {
    display : flex;
    flex-direction : row;
  }
`;
const StHeader = styled.div`
  display : flex;
  flex-direction : row;
  text-align : center;
  align-items : center;
  padding : 0px 0px 15px;
`;
const StTitle = styled.div`
  font-family: 'Happiness Sans';
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  margin-right : 4px;
  color : ${(props) => props.theme.colors.font.gray2};
`;
const StSubTitle = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color : ${(props) => props.theme.colors.font.lightGray1};
`;
const StButtonWrapper = styled.div`
`
const StButtonList = styled.span`
  display: flex;
  flex-direction: row;
  
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
const StIngredientButton = styled.button`
  width: 55px;
  height: 26px;
  font-size: 10px;
  margin-right : 8px;
  margin-bottom : 18px;
  background-color : ${(props) => props.theme.colors.background.gray};
  color : ${(props) => props.theme.colors.font.lightGray1};
  border : 0.6px solid ${(props) => props.theme.colors.font.lightGray4};
  border-radius : ${(props) => props.theme.button.layout.borderRoundRadius};
  :hover {
    background-color : ${(props) => props.theme.colors.background.yellow};
    color : ${(props) => props.theme.colors.font.mainWhite};
  }
`;
const StButtonScroll = styled.div`
  display: flex;
  flex-direction: column;
`;
const StRecipes = styled.div`
  display: flex;
  flex-direction: column;
  margin : 5px 0px;
  padding : 0px;

  height: 586px;
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
const StRecipe = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  border: 1px solid black;

  height : 108px;
  border-radius : 6px;
  background-color : ${(props) => props.theme.colors.background.gray};
  border : 1px solid #ECECEC;
  margin-bottom : 10px;
  padding : 0px;
  :hover {
    background-color : #ECECEC;
  }
`;
const StRecipeImg =styled.img`
  border-top-left-radius : 6px;
  border-bottom-left-radius : 6px;
  width : 108px;
  height : 108px;
  margin-right : 10px;
`
const StRecipeDesc = styled.div`
  display : flex; 
  flex-direction : column;
  padding : 14px 0px;
`
const StIngreWrapper = styled.div`
  display: flex;
  flex-direction : row;
  justify-content : space-between;
  align-items: center;
  padding : 0px;
`
const StRestIngredients = styled.div`
  color: #8E7B6D;
  padding : 4px 5px;
  background: #F0EADC;
  border-radius: 6px;
  margin-bottom : 6px;
  font-size : 10px;
  margin-right : 4px;
`
const StRecipeTitle = styled.div`
  color : ${(props) => props.theme.colors.font.gray0};
  font-size : 14px;
  width : 176px;
  height : 36px;
  margin-bottom : 6px;
  font-weight : 400;
  line-height : 18px;
`
const StDay = styled.div`
  color : ${(props) => props.theme.colors.font.lightGray1};
  font-weight : 400;
  font-size : 10px
`
const StMethod = styled.div`

  width: 100px;
  height: 20px;
  
`;
