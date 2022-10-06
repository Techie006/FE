import React, { useState } from 'react';
import AddIngredient from "../../assets/icons/addIngredient.png"
import HoverAddIngredient from "../../assets/icons/hoverAddIngredient.png"
import styled from "styled-components";
import Potal from '../modals/Potal';
import CreateIngredientModal from '../modals/CreateIngredientModal';


const CreateIngredient = () => {
    const [showModal, setShowModal] = useState(false);
    const showModalHandler = () => {
        setShowModal(!showModal);

    }
    return (
        <StWrapper>
            <div>재료를 추가해 볼까요?</div>
            <StAddImg onClick = {showModalHandler}/>
            <Potal>
            {showModal && <CreateIngredientModal onClose={showModalHandler} />}
            </Potal>
        </StWrapper>
    );
};

export default CreateIngredient;

const StWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    font-family: 'Happiness Sans';
    height : 60px;
    background-color : ${(props) => props.theme.colors.background.white};
    font-size : 18px;
    font-weight : 900;
    letter-spacing: -0.5px;
    color: #4B4B4B;
    padding : 20px;
    margin-bottom : 28px;
    border : 0px;
    border-radius : ${(props) => props.theme.section.layout.borderRadius};
    box-shadow : ${(props) => props.theme.section.layout.boxShadow};
`
const StAddImg = styled.div`
    cursor: pointer;
    width : 36px;
    height : 36px;
    background-image: url(${AddIngredient});
    background-repeat: no-repeat;
    background-size: cover;

    :hover {
        width : 36px;
        height : 36px;
        background-image: url(${HoverAddIngredient});
        background-repeat: no-repeat;
        background-size: cover;
    }
`