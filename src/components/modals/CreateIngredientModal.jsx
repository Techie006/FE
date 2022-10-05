import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { searchData } from "../../modules/redux/searchData";
import Button from "../../elements/atoms/Button"
import Select, { NonceProvider } from "react-select";
import Calendar from 'react-calendar';
import moment from "moment";
import { ErrorText } from "../../styles/Text";
import SearchModal from './SearchModal';
import Potal from "./Potal"
import Modal from "../../elements/templates/BigModal";
// import "./rc-dropdown/style.css";
import magnifier from "../../assets/icons/magnifier.png"
import calendar from "../../assets/icons/calendar.png"

import Swal from "sweetalert2";
import styled from "styled-components";
import axios from 'axios';



const CreateIngredientModal = ({ onClose }) => {

    const Storage = [
        {value : "refrigerated", label : "냉장"},
        {value : "freeze", label : "냉동"},
        {value : "room_temp", label : "상온"},
    ]
    const [selectStorage, setSelectStorage] = useState(Storage[0].value);
    const [validation, setValidation] = useState("");
    const [show, setShow] = useState(true);
    const [expShow, setExpShow] = useState(true);
    const [value, onChange] = useState(new Date());
    const [expValue, expOnChange] = useState(new Date());
    const [showSearch, setShowSearch] = useState(false)
    const [errorMessages, setErrorMessages] = useState("")
    const [disabled, setDisabled] = useState(true)
    
    const dispatch = useDispatch()

    const search = useSelector((state) => state.searchData);
    const searchData = search.search.payload
    
    const recommend = useSelector((state) => state.searchData.recommend);
    var recommendData = recommend.payload

    const errorMessage = {
        ingredientTitle : "재료를 정확하게 추가해주세요!",
        storageMethod : "보관방법을 선택해주세요!",
        purchaseDate : "입주날짜 혹은 유통기한을 추가해주세요!",
        exp : "입주날짜가 유통기한보다 이전날짜입니다.",
    }
    
    const {
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "submit" });
      
    const purchaseDate = moment(value).format("YYYY-MM-DD")
    const expDate = moment(expValue).format("YYYY-MM-DD")

    const onShowHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShow(!show)
    } 
    const onExpShowHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setExpShow(!expShow)
    } 
    const showSearchHandler = () => {
        setShowSearch(!showSearch)
    }
    // const disabledButtonHandler = () => {
        
    //     if (searchData === "") return 
    //     console.log("1")
    //     if (selectStorage.value === "") return 
    //     console.log("2")
    //     if (purchaseDate == "") return 
    //     console.log("3")
    //     if (expDate == "") return 
    //     console.log("4")
    //     if (purchaseDate < expDate) return
    //     else setDisabled(false)
    // }

    const onSubmitHandler = async () => {

     let auth = localStorage.getItem("Authorization")

        try{
            // if (purchaseDate > expDate) {
            //     setValidation("입주시기가 유통기한보다 같거나 이전날짜입니다.")
            
            const resp = await axios.post("https://magorosc.shop/api/ingredient",{
                id : recommendData,
                food_name : searchData,
                storage : selectStorage.value,
                in_date : moment(value).format("YYYY-MM-DD"),
                exp_date : moment(expValue).format("YYYY-MM-DD")
            },{
                headers :{
                    "Authorization" : auth,
                } 
            })
            onClose()
            
        }
        catch(error){
            console.log(error)
            setErrorMessages(errorMessage)
        }
    }

    const selectStyle = {
        valueContainer: (provided) => ({
            ...provided,
            height : '40px',
            width : '85px',
            padding : "11px 14px 11px",
            alignItems : "baseline"
        }),
        placeholder: (provided) => ({
            ...provided,
            height : '18px',
            width : '85px',
            fontSize: "14px;"
        }),
        Input : (provided) => ({
            ...provided,
            height : '40px',
            width : '286px',
            
        }),
        singleValue : (provided) => ({
            ...provided,
            height : '18px',
            width : '84px',
            color : '#656565',
            fontWeight: "400",
            letterSpacing: "-0.005em",
            fontSize: "14px;",
            color : "#A5A5A5"
        }),
        control : (provided) => ({
            ...provided,
            margin : '0px auto',
            width : '285px;',
            height : '40px',
            minHeight : '40px',
            backgroundColor : '#FAFAFA',
            border: '0.6px solid #DADADA',
            borderRadius: '6px',
            boxShadow: `0 0 0 0`,
            // '&:hover' : { textDecoration: 'none' },
            '&:focus-within' : { borderColor : "none" }
        }),
        indicatorsContainer : (provided) => ({
            ...provided,
            width : '33px',
            height : '33px',
            minHeight : '40px'
        })
    }

    return (
            <Modal header="재료를 추가해 볼까요?" onClick={onClose} depth={1}>
                <StCreateModalWrapper>
                <form onSubmit = {handleSubmit(onSubmitHandler)}>
                <div className='ingredients_name'>
                <StTitles>재료명</StTitles>
                <SearchWrapper>
                <StSearchBox>
                    {searchData !== "" && <div>{searchData}</div>}
                </StSearchBox>
                <Potal>
                {showSearch && <SearchModal onClose = {showSearchHandler}/>}
                </Potal>
                <StSearchButton onClick={showSearchHandler}/>
                </SearchWrapper>
                {searchData === "" && <ErrorText>재료를 정확하게 추가해주세요!</ErrorText>}

                </div>
                <div className='storage'>
                <StTitles>입주 칸</StTitles>
                <div>
                <StSelect
                styles={selectStyle}
                onChange = {setSelectStorage}
                placeholder = "선택해주세요!"
                options={Storage}
                isSearchable={false}
                disabled = {true}
                />
                </div>
                </div>
                <StEnteringDate>
                <StTitles>입주날짜</StTitles>
                <StDateBox>
                    <div className='date_box'>
                    <div>{moment(value).format("YYYY년 MM월 DD일")}</div>
                    <div className='icon' onClick={onShowHandler}/>
                    </div>
                    {show || <Calendar 
                                className="entering_calendar"
                                formatDay={(locale, date) => moment(date).format("DD")}
                                onChange={onChange} 
                                value={value}
                                onClickDay={(date) => {
                                    onChange(date)
                                    setShow(true)}}
                                />}
                </StDateBox>
                </StEnteringDate>
                
                <StExp>
                <StTitles>유통기한</StTitles>
                <StDateBox>
                    <div className='date_box'>
                    <div>{moment(expValue).format("YYYY년 MM월 DD일")}</div>
                    <div className='icon' onClick={onExpShowHandler}/>
                    </div>
                    {expShow || <Calendar
                                className="exp_calendar"
                                formatDay={(locale, date) => moment(date).format("DD")}
                                onChange={expOnChange} 
                                value={expValue}
                                onClickDay={(date) => {
                                    expOnChange(date)
                                    setExpShow(true)}}
                                />}
                </StDateBox>
                    {/* {error.response.data.status.message<ErrorText></ErrorText>} */}
                </StExp>
                <div className='input_wrapper'>
                <Button content="등록하기" disabled={disabled}/>
                {/* <input type="submit" className="submitButton" value = "등록하기"/> */}
                </div>
                </form>
                </StCreateModalWrapper>
                </Modal>
    );
};

export default CreateIngredientModal;

const StCreateModalWrapper = styled.div`
    height : 542px;
    padding : 0px 60px;
    .input_wrapper{
        text-align : center;
    }
    .submitButton {
        width : 123px;
        height : 36px;
        color : #664500;
        font-size : 14px;
        font-weight : 700;
        background-color : #FFDD7C;
        border-radius : 8px;
        border : 0px;
        margin-top : 40px;
    }
`
const StTitles = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    margin-top : 26px;
    margin-bottom : 10px;
    color : ${(props) => props.theme.colors.font.gray2};
`
const SearchWrapper = styled.div`
    display : flex;
    flex-direction : row;
    width : 285px;
    height : 40px;
    border : 0.6px solid #DADADA;
    background-color : #FAFAFA;
    border-radius : 6px;
    padding : 11px 14px 11px 10px;
`
const StSearchBox = styled.div`
    font-size : 14px;
    color : #A5A5A5;
    font-weight : 400;
    width : 265px;
`
const StSearchButton = styled.div`
    background-image: url(${magnifier});
    width : 19px;
    height : 19px;
`
const StSelect = styled(Select)`
    width: 227px;
    height : 35px;
    // position: relative;
    // line-height: 0px;
    font-size: 12px;
    // background-color : white;
    // border : 0px;
    // color : #black;
    // justify-content : center;
    // margin : 2px auto;
    // &::placeholder {
    //     color: #999999;
    //   }
    //   &:hover{
          
    //   }
    //   &:focus {
    //     outline: none;
    //     border: 0px solid #999999;
    //   }
`
const StSelectWrapper = styled.div`
      border : 1px solid black;
`
const StDateBox = styled.div`

    margin-bottom : 5px;
      .icon { 
        background-image: url(${calendar});
        width : 20px;
        height : 20px;
      }
      .date_box {
        display : flex;
        flex-direction : row;
        justify-content : space-between;
        width : 285px;
        height : 40px;
        border : 0.6px solid #DADADA;
        border-radius : 6px;
        padding : 11px 14px 11px ;
        background-color : #FAFAFA;
        color : #A5A5A5;
        font-weight : 400;
        font-size : 14px;
      }
`
const StEnteringDate = styled.div`
`
const StExp = styled.div`
      margin-top : 10px;
      margin-bottom : 10px;
`