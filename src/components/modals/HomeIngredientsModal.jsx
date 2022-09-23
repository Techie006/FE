import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const HomeIngredientsModal = ({ onClose }) => {

    const [ curr, setCurr ] = useState("")
    const [ ingredients, setIngredients ] = useState([])

    const onProduceClick = () => {
        setCurr("produce")
    }
    const onLivestockClick = () => {
        setCurr("livestock")
    }
    const onMarineClick = () => {
        setCurr("marine")
    }
    const onDrinkClick = () => {
        setCurr("drink")
    }
    const onEtcClick = () => {
        setCurr("etc")
    }
    const onFreezeClick = () => {
        setCurr("freeze")
        console.log("curr",curr)
    }
    const onRefrigeratedClick = () => {
        setCurr("refrigerated")
        console.log("curr",curr)
    }
    const onRoomTempClick = () => {
        setCurr("room_temp")
        console.log("curr",curr)
    }
    const onTotalClick = () => {
        setCurr("")
    }

    const getIngredients = async () => {

        const auth = localStorage.getItem("Authorization")

        const resp = await axios.get(`http://3.36.56.125/api/ingredients/detail?category=${curr}`,{
            headers :{
                "Authorization" : auth,
            } 
        })
        console.log("hoem",resp.data)
        const getAllIngredients = resp.data.content.category
        setIngredients(getAllIngredients)
    }
    useEffect(() => {
        getIngredients()
    },[curr])

    

    return (
        <StyledModalBackground>
            <StyledContent>
            <StyledHeader>
                <div><h1>우리집 식재료</h1></div>
                <div className='x' onClick={onClose}><h1>x</h1></div>
            </StyledHeader>
            <StyledButtonList>
                <button onClick={onFreezeClick}>냉동</button>
                <button onClick={onRefrigeratedClick}>냉장</button>
                <button onClick={onRoomTempClick}>상온</button>
                <button onClick={onProduceClick}>농산물</button>
                <button onClick={onLivestockClick}>축산물</button>
                <button onClick={onMarineClick}>수산물</button>
                <button onClick={onDrinkClick}>음료수</button>
                <button onClick={onEtcClick}>기타</button>
                <button onClick={onTotalClick}>전체</button>
            </StyledButtonList>
            <StyledContainer>
            <StyledWrapper>
            {ingredients.map((data, index) => (
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