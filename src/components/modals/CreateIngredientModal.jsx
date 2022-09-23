import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Select, { NonceProvider } from "react-select";
import Calendar from 'react-calendar';
import moment from "moment";
import { ErrorText, ValidateText } from "../../elements/texts/pageTexts"
import SearchModal from './SearchModal';
import Potal from "./Potal"
import 'react-calendar/dist/Calendar.css';
import { BsFillCalendarCheckFill } from "react-icons/bs";
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
    const [searchBoxValue, setSearchBoxValue] = useState("")

    const dispatch = useDispatch()

    const search = useSelector((state) => state.searchData);
    const searchData = search.search.payload
    console.log("searssssch",searchData)
    
    const recommend = useSelector((state) => state.searchData.recommend);
    var recommendData = recommend.payload
    console.log("recommend",recommendData)
    
    // useEffect(() => {
    //     setSearchBoxValue(searchData)
    // },[searchData])
    
    

    const {
        register,
        watch,
        reset,
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


    const onSubmitHandler = async () => {

     let auth = localStorage.getItem("Authorization")

        try{
            if (purchaseDate > expDate) {
                setValidation("입주시기가 유통기한보다 같거나 이전날짜입니다.")
                if( validation ){}
                
                
            
            const resp = await axios.post("http://3.36.56.125/api/ingredient",{
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
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <StyledModalBackground>
            <StyledContent>
                <form onSubmit = {handleSubmit(onSubmitHandler)}>
                <StyledHeader>
                    <div><h2>재료를 추가해 볼까요?</h2></div>
                    <div className='x' onClick={onClose}><h2>x</h2></div>
                </StyledHeader>
                <div className='ingredients_name'>
                <StyledTitles>
                    재료명
                </StyledTitles>
                <SearchWrapper>
                <StyledSearchBox>
                    {searchData}
                </StyledSearchBox>
                <Potal>
                {showSearch && <SearchModal onClose = {showSearchHandler}/>}
                </Potal>
                <StyledSearchButton onClick={showSearchHandler}>검색</StyledSearchButton>
                </SearchWrapper>

                </div>
                <div className='storage'>
                <StyledTitles>
                    입주 칸
                </StyledTitles>
                <div>
                
                <StyledSelect
                styles={{ // 모바일 환경에서도 option 목록이 항상 위로 보이게 zIndex 설정함
                    Storage : provided=> ({...provided, zIndex: 999}),
                    option : (provided, state) => ({
                        ...provided,
                    }),
                    control : (provided) => ({
                        ...provided,
                        margin : '0px auto',
                        minHeight : '35px'
                        
                    }),
                    indicatorsContainer : (provided) => ({
                        ...provided,
                        height : '33px',
                        minHeight : '30px'
                    }),
                    }}
                onChange = {setSelectStorage}
                placeholder = "선택해주세요!"
                options={Storage}
                isSearchable={false}
                // disabled = {false}
                />
                </div>
                </div>

                <StyledEnteringDate>
                <StyledTitles>
                    입주날짜
                </StyledTitles>
                <StyledDateBox>
                    <div className='date_box'>
                    <BsFillCalendarCheckFill className='icon' onClick={onShowHandler}/>
                    {moment(value).format("YYYY년 MM월 DD일")} 
                    </div>
                    {show || <Calendar 
                                className="entering_calendar"
                                formatDay={(locale, date) => moment(date).format("DD")}
                                onChange={onChange} 
                                value={value}
                                // tileContent={ ({data,navigation}) => {
                                //     return (
                                //         <>
                                //         <div class="react-calendar__navigation"/>
                                //         </>
                                //     )
                                // } }
                                // react-calendar html 변경하는 법 공부
                                />}
                </StyledDateBox>
                </StyledEnteringDate>
                
                <StyledExp>
                <StyledTitles>
                    유통기한
                </StyledTitles>
                <StyledDateBox>
                    <div className='date_box'>
                    <BsFillCalendarCheckFill className='icon' onClick={onExpShowHandler}/>
                    {moment(expValue).format("YYYY년 MM월 DD일")} 
                    </div>
                    {expShow || <Calendar
                                className="exp_calendar"
                                formatDay={(locale, date) => moment(date).format("DD")}
                                onChange={expOnChange} 
                                value={expValue}></Calendar>}
                </StyledDateBox>
                <ErrorText>{validation}</ErrorText>
                </StyledExp>
                <input type="submit" className="submitButton" value = "등록하기"/>
                </form>
            </StyledContent>
        </StyledModalBackground>
    );
};
// StyledModalBackground는 modal의 뒷배경부분이고,
// StyledContent는 modal 안의 내용물

export default CreateIngredientModal;

const StyledModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    .calendar_container {
        position:relative;
    }
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 70%;
    width: 450px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : white;
    padding : 30px;
`
const StyledHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : flex-end;
    .x {
        margin-left : 100px;
        margin-right : 20px;
    }
`
const StyledTitles = styled.div`
    margin-bottom : 20px;
    margin-top : 20px;
`
const SearchWrapper = styled.div`
    display : flex;
    flex-direction : row;
`
const StyledSearchBox = styled.div`
    width : 200px;
    border : 1px solid black;
`
const StyledSearchButton = styled.div`
    width : 100px;
`
const StyledSelect = styled(Select)`
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
const StyledDateBox = styled.div`
    margin-bottom : 5px;
      .icon { 
        float:right;
      }

      .date_box {
          width : 200px;
          border : 1px solid black;
      }
`
const StyledEnteringDate = styled.div`
`
const StyledExp = styled.div`
      margin-top : 10px;
      margin-bottom : 10px;
`