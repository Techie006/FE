import React, { useState, useEffect } from 'react';
import BookmarkBtn from "../common/BookmarkBtn";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";

const BookMarkedRecipes = () => {

    const [recipes, setRecipes] = useState([])

    const getBookMarkedRecipes = async () => {

        const auth = localStorage.getItem("Authorization")
        

        const resp = await axios.get("http://3.36.56.125/api/my/bookmark", {
            headers: {
            Authorization: auth,
            
            },
        });
        console.log("resp",resp.data.content.recipes)
        const recipesData = resp.data.content.recipes;
        setRecipes(recipesData);


        }
        useEffect(() => {
            getBookMarkedRecipes();
        },[])
    return (
        <StWrapper>
            <StBookMarkRecipes>
                {recipes && recipes.map((data, index) =>(
                    <StBookMarkRecipe key = {index}>
                        <BookmarkBtn is_liked={data.is_liked} />
                        <StImg src={data.final_img} alt={data.recipe_name} />
                        <StRecipeName>{data.recipe_name}</StRecipeName>
                        <StRecipeIngredients>{data.ingredients}</StRecipeIngredients>
                        <StEtcInfo>
                            {data.method} | {data.category} | {data.calorie}
                        </StEtcInfo>
                    </StBookMarkRecipe>
                ))}
            </StBookMarkRecipes>
        </StWrapper>
    );
};

export default BookMarkedRecipes;

const StWrapper = styled.div``
const StBookMarkRecipes = styled.div`
    display : flex;
    flex-direction : row;
    flex-wrap: wrap;
`
const StImg = styled.img`
    width : 200px;
    height : 200px;
`
const StBookMarkRecipe = styled.div`
    font-size : 14px;
`
const StRecipeName = styled.div``
const StRecipeIngredients = styled.div`
    font-size : 5px;
`
const StEtcInfo = styled.div``
// const StWrapper = styled.div``
// const StWrapper = styled.div``
// const StWrapper = styled.div``

