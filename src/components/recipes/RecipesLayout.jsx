import React from 'react';
import Recipes from "./Recipes"
import styled from "styled-components";

const RecipesLayout = () => {
    return (
        <StyledReipesWrapper>
            <Recipes/>
        </StyledReipesWrapper>
    );
};

export default RecipesLayout;

const StyledReipesWrapper = styled.div`
    width : 95%;
`