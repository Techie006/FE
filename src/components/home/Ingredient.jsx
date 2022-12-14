import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { __deleteIngredient, __getAllIngredient } from "../../modules/redux/recipeData";
import xButton from '../../assets/icons/xButton.png'
import hoverXButton from '../../assets/icons/hoverXButton.png'
import axios from 'axios';
import styled from "styled-components";

const Ingredient = ( {totalIngredient, setIngredients ,state} ) => {

    const [showXbutton, setShowXButton] = useState(false)


    const filteredIngredient = useSelector((state) => state.recipeData.ingredients)
    
    const dispatch = useDispatch()
    const onXButtonHandler = async (id) => {

        console.log(id)
        const auth = localStorage.getItem("Authorization")
        const resp = await  axios.delete(`https://magorosc.shop/api/ingredient?id=${id}`,{
                    headers : {
                        "Authorization" : auth,
                    }
                }
                )
                dispatch(__deleteIngredient(id))
            }

        useEffect(() => {
            dispatch(__getAllIngredient)
        },[dispatch])

    const Ddate =
    totalIngredient.d_date === "기한 만료" ?
        (
        <div className='d_day' style={{
            color : "#FF5C01"
            }}>
            {totalIngredient.d_date}
        </div>
        )
        :
        totalIngredient.d_date.substr(2) < 5 || totalIngredient.d_date ===  "D-Day" ?
        (
        <div className='d_day' style={{
            color : "#FFB356",
            }}>
            {totalIngredient.d_date}
        </div>
        )
        :
        (
        <div className='d_day' style={{
            color : "#74BDB2"
            }}>
            {totalIngredient.d_date}
        </div>   
        )

    return (
            <div>
                {/* {filteredIngredient.map((data) => ( */}
                    <StyledIngredinet>
                <div className='left_section'>
                <StIngredientIcon src={totalIngredient.icon_image}/>
                <StFoodNameDateGroup>
                    <div className='food_name'>
                    {totalIngredient.food_name}
                    </div>
                    <div className='in_date'>
                    {totalIngredient.in_date}
                    </div>
                </StFoodNameDateGroup>
                </div>
                <div className='right_section'>
                <div>
                {Ddate}
                </div>
                {/* {showXbutton ? <StXButton onClick={() =>{onXButtonHandler(totalIngredient.id)}} onMouseOver={setShowXButton(!showXbutton)}/> : null} */}
                <StXButton onClick={() =>{onXButtonHandler(totalIngredient.id)}}/>
                    
                </div>
                </StyledIngredinet>
                {/* } */}
                </div>
                
            
    );
};

export default Ingredient;

const StyledIngredinet = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    height : 73px;
    border : 1px solid #ECECEC;
    border-radius: 6px;
    margin-bottom : 8px;
    background-color : ${(props) => props.theme.colors.background.gray};
    font-size : 14px;
    padding : 15px;
    .left_section {
        display : flex;
        flex-direction : row;
        justify-content : left;
        align-items : center;
    }
    .right_section {
        display : flex;
        flex-direction : row;
        justify-content : right;
        align-items : center;
    }
    .food_name {
        width : 200px;
        color : #5B5B5B;
        letter-spacing : -0.5px;
    }
    .d_date {
       font-weight : ${(props) => props.theme.section.content.fontWeight};
       font-size : 20px;
       font-weight : 29px;
       letter-spacing : -0.5px;
    }
`
const StIngredientIcon = styled.img`
    text-align : center;
    margin-right : 14px;
    width : 45px;
    height : 45px;
`
const StFoodNameDateGroup = styled.div`
    display : flex;
    flex-direction : column;
    width : 150px;
    margin-right : 5px;
    margin-left : 5px;
    .food_name {
        color : #5B5B5B;
        margin-bottom : 2px;
        font-size : ${(props) => props.theme.section.content.fontSize};
        line-height : ${(props) => props.theme.section.content.lineHeight};
        font-weight : ${(props) => props.theme.section.content.fontWeight};
    }
    .in_date {
        color : ${(props) => props.theme.colors.font.lightGray1};
        font-size : 12px;
        line-height : 17px;
        font-weight : 400;
    }
`
const StXButton = styled.div`
    margin-left : 10px;
    width : 21px;
    height : 21px;
    cursor : pointer;
    background-image: url(${xButton});
    background-repeat: no-repeat;
    background-size: cover;

    :hover {
        background-image: url(${hoverXButton});
        background-repeat: no-repeat;
        background-size: cover;
    }
`