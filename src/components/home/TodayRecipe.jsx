import React, { useEffect, useState } from 'react';
import RESP_CHAE from "../../server/response_chae";
import styled from "styled-components";
import axios from 'axios';

const TodayRecipe = () => {

    const [todayRecipes, setTodayRecipes] = useState([])
    // const [data, setDate] = useState("")
    const [today, setToday] = useState("")

    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token")

    const getTodayRecipe = async () => {

        const resp = await axios.get(`http://3.36.56.125/api/calendar/day?day=${today}`,{
        
            headers : {
                "Authorization" : auth,
                "Refresh_Token" : refresh
            }
        }
        )
    // const resp = RESP_CHAE.CALENDAR.GET_ALL_WEEKLY_SUCCESS;
    // const { result, content } = resp.data;
    console.log("today",today)
    console.log("recipe?",resp.data)
    const recipeData = resp.data.content.meals
    console.log("recipe",recipeData)

    const dateRecipeData = recipeData.map(data => data)
    console.log("dateRecipeData",dateRecipeData)

    setTodayRecipes(recipeData)


    const date = new Date();

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = year + '-' + month + '-' + day;

    setToday(dateStr)

    }

    useEffect(() => {
        getTodayRecipe()
    }, [])

    return (
        <StyledWrapper>
            <StyledHeader>
                오늘 예정된 요리
            </StyledHeader>
            

            {todayRecipes.map((data, index) => (
                <StyledTodayrecipe key={index} >
                    {data.recipe_name}
                    {data.recipe_name}
                </StyledTodayrecipe>
            ))}
        </StyledWrapper>
    );
};

export default TodayRecipe;

const StyledWrapper = styled.div``
const StyledHeader = styled.div``
const StyledTodayrecipe = styled.div``
// const StyledWrapper = styled.div``
// const StyledWrapper = styled.div``
