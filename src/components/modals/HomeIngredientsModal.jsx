import React, { useState,useEffect } from 'react';
import xButton from '../../assets/icons/xButton.png'
import hoverXButton from '../../assets/icons/hoverXButton.png'
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

        const resp = await axios.get(`https://magorosc.shop/api/ingredients/detail?category=${curr}`,{
            headers :{
                "Authorization" : auth,
            } 
        })
        console.log("hoem",resp.data)
        
        const getAllIngredients = resp.data.content.storage
        setIngredients(getAllIngredients)
    }

    useEffect(() => {
        getIngredients()
    },[curr])
    
    return (
        <StyledModalBackground>
            <StyledContent>
                <div className='modal_header'>
                    <div className='title_wrapper'>
                        <div className='header_title'>우리집 식재료</div>
                        <div className='header_subtitle'>추가한 식재료의 유통기한을 확인해보세요!</div>
                    </div>
                    <div className='x' onClick={onClose}/>
                </div>
            <StyledButtonList>
                <Stbutton onClick={onTotalClick}>전체</Stbutton>
                <div className='storage_state'>
                <Stbutton onClick={onFreezeClick}>냉동</Stbutton>
                <Stbutton onClick={onRefrigeratedClick}>냉장</Stbutton>
                <Stbutton onClick={onRoomTempClick}>상온</Stbutton>
                </div>
                <div className='ingredient_category'>
                <Stbutton onClick={onProduceClick}>농산물</Stbutton>
                <Stbutton onClick={onLivestockClick}>축산물</Stbutton>
                <Stbutton onClick={onMarineClick}>수산물</Stbutton>
                <Stbutton onClick={onDrinkClick}>음료수</Stbutton>
                <Stbutton onClick={onEtcClick}>기타</Stbutton>
                </div>
            </StyledButtonList>
            <StyledContainer>
            <StyledWrapper>
            <div className='ingredient_wrapper'>
            {ingredients.map((data, index) => (
                <StyledIngredinet key={index}>
                <div className='left-section'>
                <div>
                <img className='icon' src={data.icon_image} />
                </div>
                <div className='food_desc'>
                    <div className='food_name'>
                    {data.food_name}
                    </div>
                    <div className='in_date'>
                    {data.in_date}
                    </div>
                </div>
                </div>
                <div>
                {data.d_date === "만료" ?
                (
                <div className='d_day' style={{
                    color : "#FF5C01"
                    }}>
                    {data.d_date}
                </div>
                )
                :
                data.d_date.substr(2) < 4 ?
                (
                <div className='d_day' style={{
                    color : "#FFB356",
                    }}>
                    {data.d_date}
                </div>
                )
                :
                (
                <div className='d_day' style={{
                    color : "#74BDB2"
                    }}>
                    {data.d_date}
                </div>   
                )}
                </div>
            </StyledIngredinet>
            ))}
            </div>
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
    width: 1058px;
    height: 632px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : #FFFFFF;
    .modal_header {
        display : flex;
        flex-direction : row;
        justify-content : space-between;
        padding : 20px;
        height : 68px;
        border : 1.5px solid #ECECEC;
    }
    .title_wrapper{
        display : flex;
        flex-direction : row;
        gap : 10px;
    }
    .header_title {
        font-family: 'Happiness Sans';
        font-weight: 900;
        font-size: 24px;
        line-height: 32px;
        letter-spacing: -0.005em;
        color : ${(props) => props.theme.colors.font.gray2};
    }
    .header_subtitle {
        font-weight: 400;
        font-size: 10px;
        line-height: 14px;
        display: flex;
        align-items: center;
        letter-spacing: -0.5px;
        color: #A5A5A5;
    }
    .x {
        width : 21.5px;
        height : 21.5px;
        background-image: url(${xButton});
        background-repeat: no-repeat;
        background-size: cover;

        :hover {
        background-image: url(${hoverXButton});
        background-repeat: no-repeat;
        background-size: cover;
    }
    }
`
const StyledButtonList = styled.div`
    display : flex;
    flex-direction : row;
    padding : 10px 48px 22px;
    .storage_state {
        margin : 0px 40px;
    }
`
const Stbutton = styled.button`
    width : 54px;
    height : 26px;
    background-color : #FAFAFA;
    color : #A5A5A5;
    border : 0.6px solid #ECECEC;
    border-radius : 30px;
    margin-right : 10px;
    :focus {
        background-color : #FFB356;
        color : #FFFFFF;
    }
`
const StyledIngredinet = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    width : 300px;
    height : 73px;
    margin : 8px 15px;
    font-size : 14px;
    background-color : #FAFAFA;
    border : 1px solid #ECECEC;
    border-radius : 6px;
    padding : 14px;
    .left-section {
        display : flex;
        flex-direction : row;
        justify-content : left;
    }
    .icon {
        width : 45px;
        height : 45px;
        margin-right : 14px;
    }
    .food_desc {
        display : flex;
        flex-direction : column;
        justify-content : center;
    }
    .food_name {
        font-weight: 700;
        font-size: 16px;
        letter-spacing: -0.5px;
        color: #5B5B5B;
        margin-bottom : 2px;    
    }
    .in_date {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.5px;
        color: #A5A5A5;
    }
    .d_date {
        font-family: 'Noto Sans KR';
        font-weight: 700;
        font-size: 16px;
        line-height: 23px;
        letter-spacing: -0.5px;
    }
`
const StyledWrapper = styled.div`
    width : 1050px;
    
    padding : 0px 26px 0px 26px;
    margin : 0px 1px;
      .ingredient_wrapper{
        height : 484px;
        display : flex;
        flex-direction : row;
        flex-wrap : wrap;
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
      }
`
const StyledContainer = styled.div`
    display : flex;
    flex-direction : row;
    
`