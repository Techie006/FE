import React from 'react';
import Ingredient from "./Ingredient"
import styled from "styled-components";


const Ingredients = ({ ingredients, setIngredients ,state }) => {
    return (
        <StyledWrapper>
            {ingredients.storage && ingredients.storage.map((data, index) => (
                <Ingredient totalIngredient = {data} key = {index} setIngredients={setIngredients} state={state} />
            ))}
            {/* <Ingredient totalIngredient = {ingredients} /> */}
        </StyledWrapper>
    );
};

export default Ingredients;

const StyledWrapper = styled.div`
    margin : 0px 10px;
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
`