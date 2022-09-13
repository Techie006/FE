import React, { useState ,useEffect } from 'react';

// import { useParams } from "react-router-dom"
// import { apis } from "../../shared/axios";
import RESP_WOO from "../../server/response_woo";
import RecipeDetail from './RecipeDetail';
import styled from "styled-components";

const Recipes = () => {
    const [ recipesData, setRecipesData ] = useState([]);
    // const id = useParams();
    

    const getRecipes = async () => {
    
    // const resp = await axios.get(`https://localhost:3000/api/recipes?pageNum=${3}&pageLimit=${5}`)
    const resp = RESP_WOO.RECEPIE.GET_RECIPES_SUCCESS;  
    const recipes = resp.content.recipes
    
    setRecipesData(recipes);
    }
    
    useEffect(() => {
        getRecipes()
      }, []);

    return (
        <RecipeDetails>
            {recipesData.map((data,index)=>(
                <RecipeDetail key={index} data={data} />
            ))} 
        </RecipeDetails>
  );
};
    

export default Recipes;

const RecipeDetails = styled.div`
    display : flex;
    flex-direction : row;
`