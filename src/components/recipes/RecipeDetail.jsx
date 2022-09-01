import React from 'react';
import styled from "styled-components";

const Recipe = () => {
    return (
        <StyledWrapper>
        <StyledRecipeHeader>
            <StyledRecipeTitle>title</StyledRecipeTitle>
            <StyledRecipeMethod>method</StyledRecipeMethod>
            <StyledRecipeCategory>category</StyledRecipeCategory>
            <StyledRecipeCalorie>calorie</StyledRecipeCalorie>
        </StyledRecipeHeader>
            <StyledRecipeingredients>ingredients</StyledRecipeingredients>
            <StyledRecipeImg src = "http://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/039/143/medium/IMG_5649%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpg?2019"/>
            <StyledRecipeDesc>desc</StyledRecipeDesc>
    </StyledWrapper> 
    );
};

export default Recipe;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;
    
    border : 1px solid black;
    width: fit-content;

`
const StyledRecipeHeader = styled.div`
    display : flex;
    flex-direction : row;
`
const StyledRecipeTitle = styled.div`
    margin-right : 10px;
`
const StyledRecipeMethod = styled.div`
    margin-right : 10px;
`
const StyledRecipeCategory = styled.div`
    margin-right : 10px;
`
const StyledRecipeCalorie = styled.div`
    margin-right : 10px;
`
const StyledRecipeingredients = styled.div`
    border-bottom : 1px solid black;
`
const StyledRecipeImg = styled.img`
    border-bottom : 1px solid black;
    width : 100%;
    height : 20%;
`
const StyledRecipeDesc = styled.div`
    
`