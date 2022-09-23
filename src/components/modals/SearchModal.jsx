import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { recommend, searchData } from "../../modules/redux/searchData";
import axios from 'axios';
import styled from "styled-components";

const SearchModal = ({onClose}) => {

    const dispatch =useDispatch();

    const [keyword, setKeyword] = useState("");
    const [keyItems, setKeyItems] = useState([]);
    const [keyItemsError, setKeyItemsError] = useState("");
    const [recipeBox, setRecipeBox] = useState([]);

    const onChangeData = (e) => {
        setKeyword(e.target.value);
      };

    const auth = localStorage.getItem("Authorization")

    const updateData = async (keyword) => {

        // const resp = await axios.get("http://3.36.56.125/api/ingredients/autocomplete",{
        const resp = await axios.get(`http://3.36.56.125/api/ingredients/autocomplete?foodname=${keyword}`,{
        // query
        // params : {foodname : keyword}
                // food_name : keyword
            },{
                headers : {
                    "Authorization" : auth,
                    
                } 
            })
            const autoCompleteData = resp.data.content.auto_complete;
            

            if (keyword !== ""){
            if (autoCompleteData == undefined) {
                setKeyItems([]);
                setKeyItemsError("검색결과가 없습니다!")
                
            }else{
                setKeyItemsError("")
                let auto = resp.data.content.auto_complete.filter((list) =>
                list.food_name.includes(keyword) === true).slice(0,5);
    
                setKeyItems(auto);
            }
        }else{
            setKeyItemsError("검색결과가 없습니다!")
        }
            console.log("as",resp.data.content.auto_complete)
        // && 연산자로 묶는거 고민

        const searchIngredients = async () => {

            const resp = await axios.get("http://3.36.56.125api/ingredients/search?page=0&size=5",{
                        food_name : keyword
                    },{
                        headers : {
                            "Authorization" : auth,
                            
                        } 
                    })
                const searchList = resp.data.content.search_list

                setRecipeBox(searchList)
                console.log("asd",recipeBox)
                }

             
             
        }
        useEffect(() => {
            const trottled = setTimeout(() => {
                if( keyword !== "" ) { updateData(keyword) }
            }, 150)
            return () => {
                clearTimeout(trottled)
            }
            },[keyword])
                
    
    // const throttleInputChange = async (e) => {
    //     if(isThrottling) return;

    //     const auth = localStorage.getItem("Authorization")

    //     setThrottle(e.target.value);
    //     const resp = await axios.get("http://3.36.56.125/api/ingredients/autocomplete",{
    //         food_name : trottled
    //     },{
    //         headers : {
    //             "Authorization" : auth,
                
    //         } 
    //     })
        
    //     setIsThrottling(true)
        
    //     setTimeout(() => setIsThrottling(false),TIMER);

    // }

    return (
        <SearchModalBackground>
            <SearchContent>
                <SearchHeader>
                    <h4><div>재료를 검색해주세요!</div></h4>
                    <h2><div  className='x' onClick = {onClose}>x</div></h2>
                </SearchHeader>
                <StSearchInputWrapper>
                <StSearchInput
                type = "text"
                onChange={onChangeData}
                value={keyword}
                />
                </StSearchInputWrapper>
                {keyItems.map((search, index) => (
                    <StSearchBoxWrapper key={index}>
                    <StSearchBox
                    className='search_box'
                    key = {search.food_name}
                    onClick = { () => {
                        setKeyword(search.food_name);
                        dispatch(recommend(search.id))

                    }}
                    >
                    {search.food_name}
                    </StSearchBox>                    
                    </StSearchBoxWrapper>
                ))
                }
                {keyItemsError !== "" ? (keyItemsError) : (null)}
                <StRecipesWrapper>
                {/* <StRecipesBox>{recipeBox.map((search, index) => (
                    <div key={index}>
                        {search.food_name}
                    </div>
                ))
                    }</StRecipesBox> */}
                </StRecipesWrapper>
                <StRegisterButton
                onClick = {() => {
                    dispatch(searchData(keyword))
                    onClose()
                }}>등록하기</StRegisterButton>
            </SearchContent>
        </SearchModalBackground>
    );
};

export default SearchModal;

const SearchModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.1);
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    .calendar_container {
        position:relative;
    }
    align-items: center;
`
const SearchContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 434px;
    width: 406px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : white;
    padding : 30px;
`
const SearchHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : flex-end;
    .x {
        margin-left : 30px;
        margin-right : 20px;
    }
`
const StSearchBox = styled.div`
    position : relative;
    background-color : white;
    border : 1px solid black;
    z-index : 999;
`
const StSearchBoxWrapper = styled.div`
width : 284px;

border : 1px solid black;
`
const StSearchInput = styled.input`
    border : 0px;
    width : 180px;
    height : 18px;
    font-size : 14px;
    margin-bottom : 10px;
    // .search_box {
    //     outline: none;
    // }
`

const StRegisterButton = styled.button``
const StRecipesBox = styled.div`
    position : absolute;
`
const StRecipesWrapper = styled.div``
const StSearchInputWrapper = styled.div`
    width : 286px;
    height : 40px;
    border : 1px solid black;
    border-radius : 6px;
    padding : 11px 121px 11px 14px;
`