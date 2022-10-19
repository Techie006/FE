import React, { useState, useEffect } from "react";
import emptyIngredient from "../../assets/icons/emptyIngredient.png";
import BookmarkBtn from "../common/BookmarkBtn";
import axios from "axios";
import styled from "styled-components";
import DetailModal from "../recipes/DetailModal";

const RecommendRecipes = () => {
  const [warningIngredient, setWarningIngredient] = useState([]);
  const [showRecipes, setShowRecipes] = useState([]);
  const [recipeData, setReciepData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [empty, setEmpty] = useState(false);

  const auth = localStorage.getItem("Authorization");
  const refresh = localStorage.getItem("Refresh_Token");

  var inHurryFoodName = warningIngredient.map((data) => data.food_name);

  const clickHandler = (data) => {
    setReciepData(data);
    setOpenModal(!openModal);
  };

  const onClickHandler = async (e) => {
    const buttonValue = e.target.value;
    try {
      const resp = await axios.post(
        `https://magorosc.shop/api/recipes/recommend?pageNum=${0}&pageLimit=${7}`,
        {
          base: buttonValue,
          // mark_name
          foods: inHurryFoodName,
        },
        {
          headers: {
            Authorization: auth,
          },
        }
      );
      setEmpty(resp.data.content.empty);
      setShowRecipes(resp.data.content.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarningIngredients = async () => {
    const resp = await axios.get(
      "https://magorosc.shop/api/ingredients/warning",
      {
        headers: {
          Authorization: auth,
          Refresh_Token: refresh,
        },
      }
    );
    setWarningIngredient(resp.data.content.in_hurry);
  };

  useEffect(() => {
    getWarningIngredients();
  }, []);

  return (
    <div>
      <StRecipesWrapper>
        <StHeader>
          <StTitle>추천 레시피</StTitle>
          <StSubTitle>유통기한 임박재료의 레시피를 추천해드려요!</StSubTitle>
        </StHeader>
        <StButtonWrapper>
          <StButtonList>
            {warningIngredient &&
              warningIngredient?.map((data, index) => (
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
        {!empty ? (
          <StRecipes>
            {showRecipes &&
              showRecipes?.map((data, index) => (
                <StRecipe key={index} value={data.id}>
                  <StRecipeImg src={data.recipe_image} />
                  <StRecipeDesc>
                    <StIngreWrapper>
                      <div className='ingredients'>
                        {data.common_ingredients.map((data) => (
                          <StRestIngredients>{data}</StRestIngredients>
                        ))}
                      </div>
                      <BookmarkBtn
                        className='bookmark'
                        recipe_id={data.id}
                        is_liked={data.liked}
                        isBox={false}
                      />
                    </StIngreWrapper>
                    <StRecipeTitle onClick={() => clickHandler(data)}>
                      {data.recipe_name}
                    </StRecipeTitle>
                    <StDay>
                      {data.method} | {data.category} | {data.calorie}kcal
                    </StDay>
                  </StRecipeDesc>
                </StRecipe>
              ))}
            {openModal ? (
              <DetailModal
                id={recipeData.id}
                recipeName={recipeData.recipe_name}
                onClick={clickHandler}
              />
            ) : null}
          </StRecipes>
        ) : (
          <StEmptyWrapper>
            <StEmptyImg></StEmptyImg>
            <StEmptyDesc>해당 재료의</StEmptyDesc>
            <StEmptyDesc>레시피가 없습니다!</StEmptyDesc>
          </StEmptyWrapper>
        )}
      </StRecipesWrapper>
    </div>
  );
};

export default RecommendRecipes;

const StRecipesWrapper = styled.div`
  border: 1px solid black;
  padding: 20px;
  height: 726px;
  border: 0px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  background-color: ${(props) => props.theme.section.layout.background};
  .ingredients {
    display: flex;
    flex-direction: row;
  }
`;
const StHeader = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  padding: 0px 0px 15px;
`;
const StTitle = styled.div`
  font-family: "Happiness Sans";
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  margin-right: 4px;
  color: ${(props) => props.theme.colors.font.gray2};
`;
const StSubTitle = styled.div`
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: ${(props) => props.theme.colors.font.lightGray1};
`;
const StButtonWrapper = styled.div``;
const StButtonList = styled.span`
  display: flex;
  flex-direction: row;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
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
  margin-right: 8px;
  margin-bottom: 18px;
  background-color: ${(props) => props.theme.colors.background.gray};
  color: ${(props) => props.theme.colors.font.lightGray1};
  border: 0.6px solid ${(props) => props.theme.colors.font.lightGray4};
  border-radius: ${(props) => props.theme.button.layout.borderRoundRadius};
  :hover {
    background-color: ${(props) => props.theme.colors.background.yellow};
    color: ${(props) => props.theme.colors.font.mainWhite};
  }
`;
const StButtonScroll = styled.div`
  display: flex;
  flex-direction: column;
`;
const StRecipes = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  padding: 0px;

  height: 586px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid black;

  height: 108px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.background.gray};
  border: 1px solid #ececec;
  margin-bottom: 10px;
  padding: 0px;
  :hover {
    background-color: #ececec;
  }
`;
const StRecipeImg = styled.img`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 108px;
  height: 108px;
  margin-right: 10px;
`;
const StRecipeDesc = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
`;
const StIngreWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
`;
const StRestIngredients = styled.div`
  color: #8e7b6d;
  padding: 4px 5px;
  background: #f0eadc;
  border-radius: 6px;
  margin-bottom: 6px;
  font-size: 10px;
  margin-right: 4px;
`;
const StRecipeTitle = styled.div`
  color: ${(props) => props.theme.colors.font.gray0};
  font-size: 14px;
  width: 176px;
  height: 36px;
  margin-bottom: 6px;
  font-weight: 400;
  line-height: 18px;
`;
const StDay = styled.div`
  color: ${(props) => props.theme.colors.font.lightGray1};
  font-weight: 400;
  font-size: 10px;
`;
const StEmptyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding-top: 210px;
`;
const StEmptyImg = styled.div`
  background-image: url(${emptyIngredient});
  background-repeat: no-repeat;
  background-size: cover;
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  margin-left: 10px;
`;
const StEmptyDesc = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #c0c0c0;
`;
