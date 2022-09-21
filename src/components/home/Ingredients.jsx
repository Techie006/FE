import React from 'react';
import Ingredient from "./Ingredient"
import styled from "styled-components";


const Ingredients = ({ ingredients }) => {
    
    return (
        <StyledWrapper>
            {ingredients.storage && ingredients.storage.map((data, index) => (
                <Ingredient totalIngredient = {data} key = {index}/>
            ))}
        </StyledWrapper>
    );
};

export default Ingredients;

const StyledWrapper = styled.div`
    border : 1px solid black;
    background-color : gray;
    width : 330px;
    height : 400px;
    margin : 0px auto;
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