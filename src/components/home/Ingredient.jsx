import React, { useState } from 'react';
import styled from "styled-components";

const Ingredient = ( {totalIngredient} ) => {
    console.log("asd",totalIngredient)
    const [ ingredient, setIngredient] = useState("")

    return (
        <StyledIngredinet>
            <div className='food_inDate'>
                <div>
                {totalIngredient.food_name}
                </div>
                <div>
                {totalIngredient.in_date}
                </div>
            </div>
            <div className='d_day'>
                {totalIngredient.d_date}
            </div>
            <div className='group_name'>
                {totalIngredient.group_name}
            </div>
        </StyledIngredinet>
    );
};

export default Ingredient;

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