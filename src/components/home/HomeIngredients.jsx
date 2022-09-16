import React, { useState ,useEffect } from 'react';
import Ingredients from './Ingredients';
import Potal from '../modals/Potal';
import styled from "styled-components";
import HomeIngredientsModal from '../modals/HomeIngredientsModal';
import axios from 'axios';

const HomeIngredients = () => {
    const [showModal, setShowModal] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [curr, setCurr] = useState("")
    // const storagePage = {
    //     freeze: "freeze",
    //     refrigerated:refrigerated,
    //     room_temp:room_temp,
        
    // }

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
    console.log(auth)
    console.log(refresh)

    const getIngredients = async () => {

        try{
            // var storage = [ "freeze", "refrigerated", "room_temp" ]

            // for (let i = 0; i < storage.length; i++) {
            const resp = await axios.get(`http://3.36.56.125/api/ingredients?storage=${curr}`,{
            // const resp = await axios.get("http://3.36.56.125/api/ingredients?storage=freeze",{
                headers : {
                    "Authorization" : auth,
                    "Refresh_Token" : refresh
                }
            }
            )
            console.log(`ingredient`,resp.data)
            setIngredients(resp.data.content)
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
    }, []);

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