import React from 'react';
import styled from "styled-components";

const HomeIngredientsModal = (
    { onClose, 
      ingredients, 
      freezeHandler, 
      refrigerHandler, 
      roomTempHandler,  
      totalHandler
    }) => {

    console.log("aa",ingredients)

    return (
        <StyledModalBackground>
            <StyledContent>
            <StyledHeader>
                <div><h1>우리집 식재료</h1></div>
                <div className='x' onClick={onClose}><h1>x</h1></div>
            </StyledHeader>
            <StyledButtonList>
                <button onClick={freezeHandler}>냉동</button>
                <button onClick={refrigerHandler}>냉장</button>
                <button onClick={roomTempHandler}>상온</button>
                <button onClick={totalHandler}>전체</button>
            </StyledButtonList>
            <StyledContainer>
            <StyledWrapper>
            {ingredients.storage.map((data, index) => (
                <StyledIngredinet key={index}>
                <div className='food_inDate'>
                    <div>
                    {data.food_name}
                    </div>
                    <div>
                    {data.in_date}
                    </div>
                </div>
                <div className='d_day'>
                    {data.d_date}
                </div>
                <div className='group_name'>
                    {data.group_name}
                </div>
            </StyledIngredinet>
            ))}
            </StyledWrapper>
            </StyledContainer>
            </StyledContent>
        </StyledModalBackground>
    );
};

export default HomeIngredientsModal;

const StyledModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    .calendar_container {
        position:relative;
    }
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 90%;
    width: 80%;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : white;
    padding : 30px;
`
const StyledHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    .x {
        margin-left : 100px;
        margin-right : 20px;
    }
`
const StyledButtonList = styled.div`
    display : flex;
    flex-direction : row;
    padding : 10px;
    padding-left : 0px;
    button {
        margin-right : 10px;
    }
`
const StyledIngredinet = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    justify-content : space-between;
    width : 290px;
    height : 60px;
    margin : 2px auto;
    font-size : 14px;
    .food_inDate {
        display : flex;
        flex-direction : column;
        width : 150px;
        margin-right : 5px;
        margin-left : 5px;
    }
    .d_date {
        width : 50px;
        text-align : center;
    }
    .group_name {
        width : 50px;
        text-align : center;
    }
`
const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;
    flex-wrap : wrap;
`
const StyledContainer = styled.div`
    display : flex;
    flex-direction : row;
    
`