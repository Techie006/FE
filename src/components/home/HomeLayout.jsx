import CreateIngredient from './CreateIngredient';
import HomeIngredients from './HomeIngredients';
import RecommendRecipes from './RecommendRecipes';
import Ingredients from '../statistics/Ingredients';
import styled from "styled-components";
import TodayRecipe from './TodayRecipe';
import Potal from "../modals/Potal"
import NonLoginModal from "../modals/NonLoginModal"
import React, { useState } from 'react';
import { useDispatch } from "react-redux";

const HomeLayout = () => {
    const [showNonLogin, setShowNonLogin] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    
    const dispatch = useDispatch();

    const isLoginHandler = () => {
        // localStorage.getItem("Authorization") ? null : setIsLogin(true)

    }

    const showNonLoginHandler = () => {
        setShowNonLogin(!showNonLogin);
    }
    return (
        <StyledWrapper>
            <Potal>
                {showNonLogin && <NonLoginModal onClose = {showNonLoginHandler}/>}
            </Potal>
            <StyledContainer>
            <CreateIngredient/>
            <HomeIngredients/>
            </StyledContainer>
            <StyledContainer>
            <RecommendRecipes/>
            </StyledContainer>
            <div className='wrapper'>
            <StyledContainer>
            <div className='wrapper'>
            <Ingredients/>
            <TodayRecipe/>
            </div>
            </StyledContainer>
            </div>
    </StyledWrapper>
        );
    };
    

export default HomeLayout;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction : row;
`
const StyledContainer = styled.div`
    margin-left : 70px;
    .wrapper {
        border : 1px solid black;
    }
`