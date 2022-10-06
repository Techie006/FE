import React, { useState ,useEffect } from 'react';
import { useDispatch } from "react-redux";
import MoreView from '../../assets/icons/moreView.png'
import HoverMoreView from '../../assets/icons/hoverMoreView.png'
import Ingredients from './Ingredients';
import Potal from '../modals/Potal';
import { __getAllIngredient } from "../../modules/redux/recipeData";
import styled from "styled-components";
import emptyIngredient from "../../assets/icons/emptyIngredient.png";
import HomeIngredientsModal from '../modals/HomeIngredientsModal';
import axios from 'axios';
import { recommend } from '../../modules/redux/searchData';

const HomeIngredients = () => {
    const [showModal, setShowModal] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [curr, setCurr] = useState("freeze")
    const [filterData, setFilterData] = useState([])
    const [empty, setEmpty] = useState(false)
    
    const dispatch = useDispatch();

    const showModalHandler = () => {
        setShowModal(!showModal);
    }
    const onFreezeClick = () => {
        setCurr("freeze")
    }
    const onRefrigeratedClick = () => {
        setCurr("refrigerated")
    }
    const onRoomTempClick = () => {
        setCurr("room_temp")
    }
    const onTotalClick = () => {
        setCurr("")
    }
    
    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token");

    const getIngredients = async () => {

        try{
            const resp = await axios.get(`https://magorosc.shop/api/ingredients?storage=${curr}`,{
                headers : {
                    "Authorization" : auth,
                    "Refresh_Token" : refresh
                }
            }
            )
            setIngredients(resp.data.content)
            console.log("data",resp.data.content)
            setEmpty(resp.data.content.empty)
            dispatch(__getAllIngredient(curr))
            
            const filterExpDone = resp.data.content.storage.filter((data) => data.d_date !== "만료" )
            
            setFilterData(filterExpDone)
        }
        catch(error) {
            console.log("error",error)
        }
    }
    useEffect(() => {
        getIngredients();
    }, [curr]);

    useEffect(() => {
        dispatch(recommend(filterData))
    },[ingredients]);

    return (
        <StyledInredientsWrapper className='homeIngredients'>
            <StIngredientsHeader>
                <StyledWrapperTitle>우리집 식재료 확인하기</StyledWrapperTitle>
                <StyleMoreView onClick = {showModalHandler} />
                <Potal>
                {showModal && <HomeIngredientsModal 
                onClose={showModalHandler} 
                ingredients= {ingredients}
                freezeHandler = {onFreezeClick}
                refrigerHandler = {onRefrigeratedClick}
                roomTempHandler = {onRoomTempClick}
                totalHandler = {onTotalClick}
                />}
                </Potal>
            </StIngredientsHeader>
            <StTotalIngredientNumber>총 식재료 {ingredients.total_nums}개</StTotalIngredientNumber>
            <StyledButtonList>
                <StStatusButton onClick={onFreezeClick}>냉동</StStatusButton>
                <StStatusButton onClick={onRefrigeratedClick}>냉장</StStatusButton>
                <StStatusButton onClick={onRoomTempClick}>상온</StStatusButton>
            </StyledButtonList>
            {!empty ? 
            (<Ingredients ingredients= {ingredients} setIngredients={setIngredients} state={ingredients}/>)
            : (
            <StEmptyWrapper>
                <StEmptyImg/>
                <div className='empty_desc'>식재료가 비었네요.</div>
                <div className='empty_desc'>재료를 추가해 주세요!</div>
            </StEmptyWrapper>)}
            
        </StyledInredientsWrapper>
    );
};

export default HomeIngredients;
const StyledInredientsWrapper = styled.div`
    display : flex;
    flex-direction : column;
    height : 638px;
    padding-bottom : 10px;
    background-color : ${(props) => props.theme.colors.background.white};
    box-shadow: ${(props) => props.theme.section.layout.boxShadow};
    border-radius: ${(props) => props.theme.section.layout.borderRadius};
`
const StIngredientsHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    color : ${(props) => props.theme.colors.font.gray2};
    font-weight : 900;
    font-size : 18px;
    line-height : 22px;
    padding : 20px 20px 8px;
`
const StTotalIngredientNumber = styled.div`
    border-bottom : 1px solid ${(props) => props.theme.colors.font.lightGray4};
    font-weight : ${(props) => props.theme.input.content.fontWeight};
    font-size : 12px;
    line-height : 17px;
    color : ${(props) => props.theme.colors.font.lightGray1};
    padding : 0px 20px 8px;
`
const StyledWrapperTitle = styled.div`
    font-family: 'Happiness Sans';
    text-align : center;
`
const StyleMoreView = styled.div`
    width : 36px;
    height : 36px;
    cursor: pointer;
    background-image: url(${MoreView});
    background-repeat: no-repeat;
    background-size: cover;
    border : 1px solid ${(props) => props.theme.colors.background.white};
    :hover {
        background-image: url(${HoverMoreView});
        background-repeat: no-repeat;
        background-size: cover;
        border : none;
    }
`
const StyledButtonList = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : left;
    padding : 8px 20px 14px;
`
const StStatusButton =styled.button`
    width : 44px;
    height : 26px;
    background-color : ${(props) => props.theme.colors.font.subWhite};
    color : ${(props) => props.theme.colors.font.lightGray1};
    border : 0.6px solid ${(props) => props.theme.colors.font.lightGray4};
    border-radius : 30px;
    font-size : 12px;
    font-weight : 500;
    line-height: 22px;
    align-items : center;
    margin-right : 10px;
    cursor: pointer;
    &:hover {
        
    } 
    &:hover {
        color : ${(props) => props.theme.colors.font.mainWhite};
        background-color : ${(props) => props.theme.colors.background.yellow};
    } 
`
const StEmptyWrapper =styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    margin-top : 150px;
    .empty_desc {
        font-weight: 500;
        font-size: 16px;
        line-height: 23px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.5px;
        color: #C0C0C0;
        }
`
const StEmptyImg = styled.div`
    background-image: url(${emptyIngredient});
    background-repeat: no-repeat;
    background-size: cover;
    width : 100px;
    height : 100px;
    margin-bottom : 20px;
`