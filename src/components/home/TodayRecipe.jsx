import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const TodayRecipe = () => {

    const [todayRecipes, setTodayRecipes] = useState([])
    // const [data, setDate] = useState("")

    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token")

    const getTodayRecipe = async () => {

        const date = new Date();

        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const dateStr = year + '-' + month + '-' + day;
    
        console.log("today",dateStr)

        const resp = await axios.get(`http://3.36.56.125/api/calendar/day?day=${dateStr}`,{
        
            headers : {
                "Authorization" : auth,
                "Refresh_Token" : refresh
            }
        }
        )
    // const resp = RESP_CHAE.CALENDAR.GET_ALL_WEEKLY_SUCCESS;
    // const { result, content } = resp.data;
    console.log("recipe?",resp.data)
    const recipeData = resp.data.content.meals
    console.log("recipe",recipeData)

    setTodayRecipes(recipeData)

    }

    useEffect(() => {
        getTodayRecipe()
    }, [])

    return (
        <StyledWrapper>
            <StyledHeader>
                오늘 예정된 요리
            </StyledHeader>
            
        <StyledRecipeWrapper>
            {todayRecipes.map((data, index) => (
                <StyledTodayrecipe key={index}>
                    <StyledTitle>
                        <div>
                            {data.recipe_name}
                        </div>
                        <NavLink to="/calendar">
                            수정하기
                        </NavLink>
                    </StyledTitle>
                    <StyledContent>
                        <div>
                            {data.day}
                        </div>
                        <StyledTimeBox>
                            {data.time}
                        </StyledTimeBox>
                    </StyledContent>
                </StyledTodayrecipe>
            ))}
            </StyledRecipeWrapper>
        </StyledWrapper>
    );
};

export default TodayRecipe;

const StyledWrapper = styled.div`
    height : 240px;
`
const StyledHeader = styled.div`
    border : 1px solid black;
    padding : 10px;
    margin-bottom : 10px;
`
const StyledRecipeWrapper = styled.div`
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
const StyledTodayrecipe = styled.div`
    border : 1px solid black;
    padding : 5px;
    margin-bottom : 10px;
`
const StyledTitle = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-around;
    margin-bottom : 10px;
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-around;
`
const StyledTimeBox = styled.div`
    border : 1px solid black;
    border-radius : 10px;
    padding : 3px;
    font-size : 14px;
`

// const StyledBottom = styled.div``

