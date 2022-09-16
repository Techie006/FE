import React, { useState } from 'react';
import styled from "styled-components";
import Potal from '../modals/Potal';
import CreateIngredientModal from '../modals/CreateIngredientModal';


const CreateIngredient = () => {
    const [showModal, setShowModal] = useState(false);
    const showModalHandler = () => {
        setShowModal(!showModal);
    }
    return (
        <StyledWrapper >
            <div onClick = {showModalHandler}>재료를 추가해 볼까요?</div>
            <Potal>
            {showModal && <CreateIngredientModal onClose={showModalHandler} />}
            </Potal>
        </StyledWrapper>
    );
};

export default CreateIngredient;

const StyledWrapper = styled.div`
    border : 1px solid black;
    background-color : yellow;
    width : 350px;
    text-align : center;
    margin-bottom : 20px;
`