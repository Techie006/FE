import React, { useState ,useEffect } from 'react';
import { useDispatch } from "react-redux";

import Ingredients from './Ingredients';
import Potal from '../modals/Potal';
import styled from "styled-components";
import HomeIngredientsModal from '../modals/HomeIngredientsModal';
import axios from 'axios';
import { recommend } from '../../modules/redux/searchData';

const HomeIngredients = () => {
    const [showModal, setShowModal] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [curr, setCurr] = useState("")
    const [filterData, setFilterData] = useState([])

    const dispatch = useDispatch();

    const showModalHandler = () => {
        setShowModal(!showModal);
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
        console.log("curr",curr)
    }
    

    // const storagePage = {
    //     freeze: "freeze",
    //     refrigerated:"refrigerated",
    //     room_temp:"room_temp",
    //     total : ""
    // }

    const auth = localStorage.getItem("Authorization")
    const refresh = localStorage.getItem("Refresh_Token");

    const getIngredients = async () => {

        try{
            const resp = await axios.get(`http://3.36.56.125/api/ingredients?storage=${curr}`,{
            // const resp = await axios.get("http://3.36.56.125/api/ingredients?storage=freeze",{
                headers : {
                    "Authorization" : auth,
                    "Refresh_Token" : refresh
                }
            }
            )
            setIngredients(resp.data.content)
            const filterExpDone = resp.data.content.storage.filter((data) => data.d_date !== "유통기간만료" )
            console.log("whta",filterExpDone)
            setFilterData(filterExpDone)
            
            const dDate = resp.data.content.storage.map((data)=>data.d_date)
            const sort = dDate.sort(function(a,b,c) {
                var x = "유통기한만료"
                var y = "D-day"
                var z = "D-"

                if (x < y) return -1
                if (x < z) return -1
                if (y < z) return -1
            });
            console.log("Ddate",dDate)
            console.log("sort",sort)
            console.log("storage",resp.data.content.storage)

            // var list = [
            //     {x : "유통기한만료"},
            //     {y : "유통기한만료"},
            //     {z : "유통기한만료"},
            // ]
            // const sort2 = list 
            
            
            // if ( storage[0] ){
            //     console.log("free", resp.data.storage)
            // }
            // if ( storage[1] ) {
            //     console.log("refri", resp.data.storage)
            // }
        }
    // }
        catch(error) {
            console.log("error",error)
        }
    }
    useEffect(() => {
        getIngredients();
    }, [curr]);
    useEffect(() => {
        console.log("fiter",filterData)
        dispatch(recommend(filterData))
    },[ingredients])
    return (
        <StyledInredientsWrapper>
            <StyledIngredientsHeader>
                <StyledWrapperTitle>우리집 식재료 확인하기</StyledWrapperTitle>
                <StyleMoreView onClick = {showModalHandler}>더보기</StyleMoreView>
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
            </StyledIngredientsHeader>
            <StyledButtonList>
                <button onClick={onFreezeClick}>냉동</button>
                <button onClick={onRefrigeratedClick}>냉장</button>
                <button onClick={onRoomTempClick}>상온</button>
            </StyledButtonList>
            <Ingredients ingredients= {ingredients}/>
        </StyledInredientsWrapper>
    );
};

export default HomeIngredients;
const StyledInredientsWrapper = styled.div`
    display : flex;
    flex-direction : column;
    width : 350px;
    height : 500px;
    border : 1px solid black;
`
const StyledIngredientsHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    margin : 5px;
`
const StyledWrapperTitle = styled.div`
    text-align : center;
    
`
const StyleMoreView = styled.div`
`
const StyledButtonList = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-around;
    padding : 10px;
`