import React, { useState } from 'react';
import Select, { NonceProvider } from "react-select";
import Calendar from 'react-calendar';
import moment from "moment";
import 'react-calendar/dist/Calendar.css';
import { BsFillCalendarCheckFill } from "react-icons/bs";
import styled from "styled-components";


const CreateIngredientModal = ({ onClose }) => {
    const Storage = [
        {value : "냉장", label : "냉장"},
        {value : "냉동", label : "냉동"},
        {value : "상온", label : "상온"},
    ]
    const [selectStorage, setSelectStorage] = useState(Storage[0].value);
    const [input, setInput] = useState("")
    const [show, setShow] = useState(true)
    const [expShow, setExpShow] = useState(true)
    const [value, onChange] = useState(new Date());
    const [expValue, expOnChange] = useState(new Date());

    const onChangeHandler = (e) => {
        setInput(e.target.value)
    }
    const onShowHandler = () => {
        setShow(!show)
    } 
    const onExpShowHandler = () => {
        setExpShow(!expShow)
    } 
    // const selectStyles = {
    //     option : (provided, state) => ({
    //         ...provided,
    //         borderBottom : '1px dotted pink'
    //     })
    // }
    // 스타일 사용해서 select 스타일 최종 정리하기,
    return (
        <StyledModalBackground>
            <StyledContent>
                <StyledHeader>
                    <div><h2>재료를 추가해 볼까요?</h2></div>
                    <div className='x' onClick={onClose}><h2>x</h2></div>
                </StyledHeader>
                <div className='ingredients_name'>
                <StyledTitles>
                    재료명
                </StyledTitles>
                <input 
                className= "ingredients_title"
                type = "text"
                placeholder='재료명을 입력해 주세요!'
                onClick = {onChangeHandler}
                />
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
                        borderBottom : '10px  solid black'
                    }),
                    // input : (provided, state)  => ({
                    //     .react-select-3-input{
                    //         display : 'none'
                    //     },
                    // }),
                    // input 삭제 어케함? console 찍으면 나옴
                    singleValue : (provided, state)  => ({
                        width : '50px',
                        height : '20px',
                        fontSize : '20px'
                    })
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
                                value={expValue}/>}
                </StyledDateBox>
                </StyledExp>
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
const StyledSelect = styled(Select)`
    width: 200px;
    height : 30px;
    position: relative;
    line-height: 14px;
    font-size: 13px;
    background-color : white;
    border : 0px;
    color : #black;
    justify-content : center;
    &::placeholder {
        color: #999999;
      }
      &:hover{
          
      }
      &:focus {
        outline: none;
        border: 0px solid #999999;
      }
`
const StyledDateBox = styled.div`
      .icon { 
        float:right;
      }
      .calendar_container {
          width : 200px;
      }
      .date_box {
          width : 200px;
          border : 1px solid black;
      }
`
const StyledEnteringDate = styled.div`
`
const StyledExp = styled.div`
`