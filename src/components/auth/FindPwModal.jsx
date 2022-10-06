import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { ErrorText } from "../../styles/Text";
import { ReactComponent as X } from "../../assets/icons/circleX.svg";
import axios from 'axios';

import { showAlert } from "../../shared/popups";
import styled from "styled-components";


const FindPwModal = ( { onClick } ) => {
    
    const [error, setError] = useState("")

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "submit" });

    const onSubmitHadler = async () => {

        try{
            const resp = await axios.patch(`https://magorosc.shop/api/password`,{

                email : watch("email")
                })
            if ( resp.data.result === true ) 
                showAlert(3000, "info", "인증메일 전송중입니다.");
            else setError(resp.data.status.message)
        }
        catch(error) {
            console.log(error)
        }
    }
    return (
        <StyledModalBackground>
            <StyledContent>
                <StHeader>
                <StTitle>
                    비밀번호 찾기
                </StTitle>
                <X fill= "#4B4B4B" onClick={onClick}/>
                </StHeader>
                <StContent>
                    <StContentTitle>
                        이메일
                    </StContentTitle>
                    <form onSubmit = {handleSubmit(onSubmitHadler)}>    
                    <input
                    className='email'
                    type = "text"
                    placeholder="email"
                    {...register("email",{
                    required : "이메일을 입력해주세요."
                    })}
                    />
                    {setError !== "" ? 
                    (<ErrorText>{error}</ErrorText>):
                    (null)}
                    <input type="submit" className="submitButton" value = "이메일 인증하기"/>
                    </form>
                </StContent>
            </StyledContent>
        </StyledModalBackground>
    );
};

export default FindPwModal;

const StyledModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index : 300;
    left: 0;
    top: 0;
    text-align: center;
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : column;
    text-align: left;
    width: 405px;
    height: 272px;
    position: relative;
    background: #FFFFFF;
    border-radius: 15px;
    z-index : 200;
    .email {
        width : 285px;
        height : 40px;
        padding : 11px 0px 11px 14px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.005em;
        color: #A5A5A5;
        border-radius : 6px;
        border : 0.6px solid #DADADA;
        margin-bottom : 10px;
    }
    .submitButton {
        display : flex;
        justify-content: center;
        margin-top : 40px;
        margin-left : 80px;
        width : 123px;
        height : 36px;
        background-color: #FFDD7C;
        border-radius: 8px;
        font-size: 14px;
        text-align: center;
        letter-spacing: -0.005em;
        color: #664500;
        border : 0px;
        
        :hover {
            background-color: #FFB356;
            color: #482647;
        }
    }
    x {
        width : 10px;
        height : 10px; 
    }
`
const StHeader = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    border-bottom: 1.5px solid #ECECEC;
    padding : 20px 28px;
    align-items : center;
`
const StTitle = styled.div`
    font-weight: 900;
    font-size: 24px;
    line-height: 32px;
    color: #4B4B4B;
    
`
const StContentTitle = styled.div`
    font-weight: 700;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.5px;
    color: #4B4B4B;
    margin-bottom : 10px;
    
`
const StContent = styled.div`
    padding : 18px 10px 10px 61px;   
`