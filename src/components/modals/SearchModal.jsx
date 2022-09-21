import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const SearchModal = ({onClose}) => {
    const TIMER = 2000;

    const [keyword, setKeyword] = useState("");
    const [keyItems, setKeyItems] = useState([]);

    const onChangeData = (e) => {
        setKeyword(e.target.value);
      };
      console.log("keyword",keyword)
    
    const updateData = async (keyword) => {

        const auth = localStorage.getItem("Authorization")  
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
            let auto = resp.data.auto_complete.filter((list) =>
             list.food_name.includes(keyword) === true).slice(0,5);
             console.log(auto)
             setKeyItems(auto);
        }
        useEffect(() => {
            console.log(keyword)
            const trottled = setTimeout(() => {
                if( keyword !== "" ) {
                    console.log(keyword)
                updateData(keyword) }
            }, 1000)
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
                <input
                type = "text"
                onChange={onChangeData}
                value={keyword}
                />
                {keyItems.map((search, index) => (
                    <div
                    key = {search.food_name}
                    onClick = { () => {
                        setKeyword(search.food_name);
                    }}
                    >
                    </div>
                ))
                }
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
    height: 400px;
    width: 300px;
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