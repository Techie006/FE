import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import RecipeDetailModal from '../modals/RecipeDetailModal';
import styled from "styled-components";


const RecipeDetail = ({data}) => {
        const [modalOpen, setModalOpen] = useState(false);

        const openModal = () => {
          setModalOpen(!modalOpen);
        };

    return (
        <div>
            <StyledWrapper onClick={openModal}>
                <StyledRecipesImg src={data.final_img}/>
                <StyledRecipesTitle>{data.recipe_name}</StyledRecipesTitle>
                <StyledRecipesDesc>desc</StyledRecipesDesc>
                <RecipeDetailModal  open={openModal} modalState={modalOpen}/>
            </StyledWrapper> 
            
        </div>
    );
};

export default RecipeDetail;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;
    width : 100px;
    
    border : 1px solid black;

`
const StyledRecipesImg = styled.img`
    border-bottom : 1px solid black;
`
const StyledRecipesTitle = styled.div`
    border-bottom : 1px solid black;
`
const StyledRecipesDesc = styled.div`
`