import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Modal from "../../elements/templates/BigModal";
import magnifier from "../../assets/icons/magnifier.png"
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

        // const resp = await axios.get("https://magorosc.shop/api/ingredients/autocomplete",{
        const resp = await axios.get(`https://magorosc.shop/api/ingredients/autocomplete?foodname=${keyword}`,{
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
                list.food_name.includes(keyword) === true)
    
                setKeyItems(auto);
            }
        }else{
            setKeyItemsError("검색결과가 없습니다!")
        }
            console.log("as",resp.data.content.auto_complete)
        // && 연산자로 묶는거 고민

        const searchIngredients = async () => {

            const resp = await axios.get("http://3.38.214.79api/ingredients/search?page=0&size=5",{
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
    //     const resp = await axios.get("https://magorosc.shop/api/ingredients/autocomplete",{
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
        <Modal header="재료를 검색해주세요!" onClick={onClose} depth={2}>
        
                <StSearchInputWrapper>
                <div>
                <StSearchInput
                type = "text"
                onChange={onChangeData}
                value={keyword}
                />
                </div>
                <div><StIcon/></div>
                </StSearchInputWrapper>
                <StSearchBoxWrapper>
                {keyItems.map((search, index) => (
                    <StSearchBox
                    className='search_box'
                    key = {search.food_name}
                    onClick = { () => {
                        // setKeyword(search.food_name);
                        dispatch(recommend(search.id))
                        dispatch(searchData(search.food_name))
                        onClose()
                    }}
                    >
                    {search.food_name}
                    </StSearchBox>                    
                ))
                }
                </StSearchBoxWrapper>
                {keyItemsError !== "" ? (keyItemsError) : (null)}
        </Modal>
    );
};

export default SearchModal;

const StSearchBox = styled.div`
width: 285px;
height: 37px;
padding: 7px 1px;
color: #5b5b5b;
&:hover {
  background: #fafafa;
  color: #ff8e42;
}
`
const StSearchBoxWrapper = styled.div`
    margin : 8px auto;
    padding: 0px 0px 28px 0px;
    width: 285px;
    height: 356px;
    overflow-y: scroll;
`
const StIcon = styled.div`
    background-image: url(${magnifier});
    width : 19px;
    height : 19px;
`
const StSearchInput = styled.input`
    border : 0px;
    background-color : #FAFAFA;
    color : #5B5B5B;
    font-size : 14px;
    border : 0px;
    width : 240px;
    height : 35px;
    font-size : 14px;
    outline: none;
`
const StRecipesWrapper = styled.div``
const StSearchInputWrapper = styled.div`
    display : flex;
    flex-direction : row;
    align-items : center;
    background-color : #FAFAFA;
    border : 0.6px solid #DADADA;
    border-radius : 6px;
    padding : 11px 14px;
    width : 286px;
    height : 40px;
    border-radius : 6px;
    margin : 0px auto;
`