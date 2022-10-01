import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../modules/redux/userData";
import BookmarkBtn from "../common/BookmarkBtn";
import DetailModal from "./DetailModal";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";

const BookMarkedRecipes = () => {

    const [recipe, setRecipe] = useState({
        id : 1,
        recipe_name : "",
    })
    const [recipes, setRecipes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState("")

    const clickHandler = (data) => {
        setShowModal(!showModal);
        setRecipe(data)
        console.log("ssss",recipe)
    }

    const getBookMarkedRecipes = async () => {

        const auth = localStorage.getItem("Authorization")
        
        const resp = await axios.get(`https://magorosc.shop/api/my/bookmark?pageNum=0&pageLimit=100`, {
            headers: {
            Authorization: auth,
            },
        });
        const recipesData = resp.data.content
        console.log("resp",resp.data.content.recipes)
        setRecipes(recipesData.recipes);
        setUser(recipesData.user_name)
        console.log("resp",recipes);

        }
        useEffect(() => {
            getBookMarkedRecipes();
        },[])
        const bookmarkRecipe =                 
        recipes && recipes.map((data, index) =>(
            <StBookMarkRecipe key={index} onClick={() => {clickHandler(data)}}>
                {/* <BookmarkBtn is_liked={data.liked} /> */}
                <StImg src={data.final_img} alt={data.recipe_name} />
                <StRecipeDesc>
                <StRecipeIngredients>{data.ingredients.map((data) => 
                (<div className='recipe_ingredient'>{data}</div>))}
                </StRecipeIngredients>
                <StRecipeName>{data.recipe_name}</StRecipeName>
                <StEtcInfo>
                    {data.method} | {data.category} | {data.calorie} kcal
                </StEtcInfo>
                </StRecipeDesc>
            </StBookMarkRecipe>
        ))
    return (
        <StWrapper>
            <StTitle>
                {user} 님의 북마크
            </StTitle>
            <StBookMarkRecipes>
                {bookmarkRecipe }
                {showModal ? 
                (<DetailModal
                    id={recipe.id}
                    recipeName={recipe.recipe_name}
                    totalIngredient = {recipe.ingredients}
                    onClick={clickHandler}
                    />) : (null)}
            </StBookMarkRecipes>
        </StWrapper>
    );
};

export default BookMarkedRecipes;

const StWrapper = styled.div`
`
const StTitle = styled.div`
    font-family: 'Happiness Sans';
    font-weight: 900;
    font-size: 30px;
    line-height: 38px;
    color: #5B5B5B;
    margin : 40px 56px 22px 56px;
    padding-bottom : 36px;
    border-bottom : 1.5px solid #ECECEC;
`
const StBookMarkRecipes = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    flex-wrap: wrap;
`
const StImg = styled.img`
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width : 405px;
    height : 167px;
`
const StRecipeDesc =styled.div`
    padding : 12px 0px 12px 18px;
`
const StBookMarkRecipe = styled.div`
    width: 405px;
    height: 302px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin : 28px;
`
const StRecipeIngredients = styled.div`
    display: flex;
    margin-bottom :10px;
    .recipe_ingredient {
        padding : 5px 8px 5px 8px;
        height : 27px;
        background-color : #F0EADC;
        border-radius: 6px;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        margin-right : 10px;
        letter-spacing: -0.5px;
        color: #8E7B6D;
    }
`
const StRecipeName = styled.div`
    width: 369px;
    height: 52px;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #8E7B6D;
`

const StEtcInfo = styled.div`
    height: 14px;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: -0.3px;
    color: #A5A5A5;
`

// const StWrapper = styled.div``
// const StWrapper = styled.div``

