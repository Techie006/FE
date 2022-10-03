import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../modules/redux/userData";
import BookmarkBtn from "../common/BookmarkBtn";
import DetailModal from "./DetailModal";
import axios from 'axios';
import Swal from "sweetalert2";
import GridTemplate from "../../elements/templates/GridTemplate";
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
                
                <StImg style={{
                    backgroundImage : `url(${data.final_img})`,
                    backgroundSize : "100% 100%",
                }}>
                <BookmarkBtn className="bookmark" recipe_id={data.id} is_liked={data.liked} isBox={false} />
                </StImg>
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
        <GridTemplate>
            <StMainSection>
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
        </StMainSection>
        </GridTemplate>
    );
};

export default BookMarkedRecipes;

const StGrid = styled.div`
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
`;

const StMainSection = styled(StGrid)`
  grid-column: 1 / span 12;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StWrapper = styled.div`
    cursor: pointer;
`
const StTitle = styled.div`
    font-family: 'Happiness Sans';
    font-weight: 900;
    font-size: 30px;
    line-height: 38px;
    color: #5B5B5B;
    margin-top : 40px; 
    padding-bottom : 36px;
`
const StBookMarkRecipes = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : left;
    text-align : center;
    flex-wrap: wrap;
    padding-top : 22px; 
    border-top : 1.5px solid #ECECEC;
`
const StImg = styled.div`
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    width : 352px;
    height : 167px;
    padding-left : 91%;
    padding-top : 3%;
`
const StRecipeDesc =styled.div`
    padding : 12px 0px 12px 18px;
`
const StBookMarkRecipe = styled.div`
    width : 352px;
    height: 302px;
    background-color: #FFFFFF;
    box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin-right : 14px;
    margin-left : 14px;
    margin-bottom : 28px;
    .bookmark {
        position : absolute;
    }
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
    text-align : left;
`

const StEtcInfo = styled.div`
    height: 14px;
    font-weight: 400;
    font-size: 10px;
    line-height: 14px;
    letter-spacing: -0.3px;
    color: #A5A5A5;
    text-align : left;
`

// const StWrapper = styled.div``
// const StWrapper = styled.div``

