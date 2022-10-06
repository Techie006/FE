import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const TodayRecipe = () => {

    const navigate = useNavigate();

    const [todayRecipes, setTodayRecipes] = useState([])
    console.log(todayRecipes)
    // const emptyData = todayRecipes[0].id


    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token")

    const getTodayRecipe = async () => {

        const date = new Date();

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateStr = year + '-' + month + '-' + day;

        const resp = await axios.get(`https://magorosc.shop/api/calendar/day?day=${dateStr}`,{
        
            headers : {
                "Authorization" : auth,
                "Refresh_Token" : refresh
            }
        }
        )
    // const resp = RESP_CHAE.CALENDAR.GET_ALL_WEEKLY_SUCCESS;
    // const { result, content } = resp.data;
    
    const recipeData = resp.data.content.meals
    setTodayRecipes(recipeData)
    console.log(recipeData)
    }

    useEffect(() => {
        getTodayRecipe()
    }, [])

    return (
        
        <StWrapper>
            <StHeader>
                <div>
                <StTitle>오늘 예정된 요리</StTitle>
                </div>
                <div>
                <StButton onClick={() => 
                navigate("/calendar")
                }>캘린더로 가기</StButton>
                </div>
            </StHeader>
        <StRecipeWrapper>
            {todayRecipes && todayRecipes.map((data, index) => (
                <StTodayrecipe key={index}>
                    <StRecipeTitle>
                            {data.recipe_name}
                    </StRecipeTitle>
                    <StContent>
                    <div className='left_section'>
                    <StTimeBox>
                        {data.time}
                    </StTimeBox>
                    <div className='etc_desc'>
                        {data.method} | {data.category} | {data.calorie} 
                    </div>
                    </div>
                    <div className='day'>
                        {data.day}
                    </div>
                    </StContent>

                </StTodayrecipe>
            ))}
            </StRecipeWrapper>
        </StWrapper>
    );
};

export default TodayRecipe;

const StWrapper = styled.div`
    padding : 20px;
    background-color : ${(props) => props.theme.colors.background.white};
    box-shadow : ${(props) => props.theme.section.layout.boxShadow};
    border-radius : ${(props) => props.theme.section.layout.borderRadius};
    height : 334px;
`
const StHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    height : 55px;
`
const StTitle = styled.div`
    font-family: 'Happiness Sans';
    letter-spacing: -0.5px;
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    color : ${(props) => props.theme.colors.font.gray2};
`
const StButton = styled.button`
    width : 67px;
    height : 22px;
    font-weight: 500;
    font-size: 10px;
    letter-spacing: -0.5px;
    line-height: 14px;
    color : ${(props) => props.theme.colors.font.mainWhite};
    background-color : ${(props) => props.theme.colors.background.yellow};
    border-radius : 6px;
    border : 0px;
`
const StRecipeWrapper = styled.div`
    height : 220px;
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
const StTodayrecipe = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : left;
    height : 83px;
    border-top : 1px solid #ECECEC;
    border-bottom : 1px solid #ECECEC; 
    padding : 5px;
    background-color : #FFFFFF;
    :hover {
        background-color : rgba(236, 236, 236, 0.5);
    }
`
const StRecipeTitle = styled.div`
    margin-bottom : 14px;
`
const StContent = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    .left_section {
        display : flex;
        flex-direction : left:
    }
    .etc_desc {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.5px;
        color: #A5A5A5;
    }
    .day {
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.5px;
        color: #5B5B5B;
    }
`
const StTimeBox = styled.div`
    background-color : #F0EADC;
    text-align : center;
    padding : 2px 0px 2px 0px ;
    border-radius : 6px;
    width : 38px;
    height : 22px;
    font-size : 14px;
    font-weight: 500;
    font-size: 12px;
    line-height: 17px;
    color: #8E7B6D;
    letter-spacing: -0.5px;
    margin-right : 14px;

`

// const StyledBottom = styled.div``

