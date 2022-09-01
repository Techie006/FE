import React, { useState ,useEffect } from 'react';

import { useParams ,Link} from "react-router-dom"
import axios from "axios"
// import { apis } from "../../shared/axios";
// import {RESP_WOO} from "../../server/response_woo";
import styled from "styled-components";

const Recipes = () => {
    const [ recipeData, setRecipeData ] = useState("");
    const id = useParams();
    

    const getRecipes = async () => {
    
    const resp = await axios.get(`https://localhost:3000/api/recipes?pageNum=${3}&pageLimit=${5}`)
    // const resp = RESP_WOO.RECEPIE.GET_RECIPES_SUCCESS;  
    const recipes = resp.content.recipes[0]
    // 반복문 질문 

    setRecipeData(recipes);
      console.log(resp.content.recipes)
        // for(let i = 0; i<recipes.length; i++ ) {        
        //      const id =recipes[i].id
        //      console.log (id)
        //      return id 
        //     }
        // }
    }
    useEffect(() => {
        getRecipes()
      }, []);

    return (
        
        <Link to={`/recipe/detail/${id}`}>
        <StyledWrapper>
            <StyledRecipesImg src={recipeData.final_img}/>
            <StyledRecipesTitle>{recipeData.recipe_name}</StyledRecipesTitle>
            <StyledRecipesDesc>desc</StyledRecipesDesc>
        </StyledWrapper> 
        </Link>
  );
};
    

export default Recipes;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;
    text-align : center;
    width: fit-content;
    
    border : 1px solid black;

`
const StyledRecipesImg = styled.img`
    border-bottom : 1px solid black;
`
const StyledRecipesTitle = styled.div`
    border-bottom : 1px solid black;
`
const StyledRecipesDesc = styled.div`
`