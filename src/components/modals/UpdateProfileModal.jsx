import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { ErrorText, ValidateText } from "../../elements/texts/pageTexts"
import axios from 'axios';
import styled from "styled-components";

const UpdateProfileModal = ({ onClose }) => {

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [updateErrorMessage, setUpdateErrorMessage] = useState("")

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "submit" });

      const onShowHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShow((prev) => !prev)
    }

    const uploadUserProfile = async () => {
        const auth = localStorage.getItem("Authorization")
        const resp = await axios.put("http://3.36.56.125/api/my/profile",{
                    
        image : "file // url아님",
            },{
                headers:{
                    "Authorization" : auth
                }
            })
    }

    const updateProfileHandler = async () => {
        const auth = localStorage.getItem("Authorization")
        try{
            
        if( watch("updatePw") == watch("updatePwConfirm") ){
            setUpdateErrorMessage("")
        const resp = await axios.put("http://3.36.56.125/api/my/password",{
                
            present_password : watch("password"),
            change_password : watch("updatePwConfirm"),

            },{
                headers:{

                    "Authorization" : auth
                }
            })
                console.log(updateErrorMessage)
            }else{
                setUpdateErrorMessage("변경할 비밀번호를 다시 확인해주세요.")
                console.log("bad")
            }
        }
        catch(error){
            console.log("password_error",error.response.data.status.message)
            
            setErrorMessage(error.response.data.status.message)
        }
    }

    return (
        <StWrapper>
            <StModalContent>
            <StProfileHeaderWrapper>
                <StProfileHeader>프로필 변경</StProfileHeader>
                <StCloseBox onClick ={onClose}>x</StCloseBox>
            </StProfileHeaderWrapper>
            <StProfileImgWrapper>
                <StProfileImg></StProfileImg>
                <FcAddImage/>
            </StProfileImgWrapper>
            <StUpdatePwWrapper>
                <form onSubmit={handleSubmit(updateProfileHandler)}>
                    <StTitle>기존 비밀번호 입력</StTitle>
                    <input
                        autoComplete='on'
                        className='present_pw'
                        type = {!show ? "password" : "text"}
                        id = "password"
                        placeholder="패스워드를 입력해주세요."
                        {...register("password",{
                        required : "패스워드를 입력해주세요."
                        })}
                    />
                    {errors.password ? (
                    <ErrorText>{errors.password.message}</ErrorText>
                    ):
                    (
                    null
                    )}
                    {errorMessage !== "" ? 
                    (<ErrorText>{errorMessage}</ErrorText>)
                    :
                    (null)}
                    <StTitle>새로운 비밀번호 입력</StTitle>
                    <input
                        autoComplete='on'
                        className='update_pw'
                        type = {!show ? "password" : "text"}
                        id = "update_pw"
                        placeholder="패스워드를 입력해주세요."
                        {...register("updatePw",{
                        required : "패스워드를 입력해주세요."
                        })}
                    />
                    {updateErrorMessage !== "" ? 
                    (<ErrorText>{updateErrorMessage}</ErrorText>)
                    :
                    (null)}
                    <StTitle>비밀번호 확인</StTitle>
                    <input
                        autoComplete='on'
                        className='update_pw_confirm'
                        type = {!show ? "password" : "text"}
                        id = "update_password_confirm"
                        placeholder="패스워드를 입력해주세요."
                        {...register("updatePwConfirm",{
                        required : "패스워드를 입력해주세요."
                        })}
                    />
                    {errors.updatePwConfirm ? (
                    <ErrorText>{errors.updatePwConfirm.message}</ErrorText>
                    ):
                    (
                    null
                    )}
                     {!show ? (
                        <button className='show_button' onClick = {onShowHandler}>
                            <AiFillEye className='icon' />
                        </button>
                        ) : (
                        <button className='show_button' onClick = {onShowHandler}>
                            <AiFillEyeInvisible className="icon" />
                        </button>
                        )}
                    <input type="submit" className="submitButton" value = "비밀번호 변경하기"/>
                </form>
            </StUpdatePwWrapper>
            </StModalContent>
        </StWrapper>
    );
};

export default UpdateProfileModal;

const StWrapper = styled.div`
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
const StModalContent = styled.div`
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
const StProfileImgWrapper = styled.div``
const StProfileImg = styled.img`
    width : 150px;
    height : 150px;
`
const StUpdatePwWrapper = styled.div``
const StTitle = styled.div``
const StProfileHeaderWrapper = styled.div``
const StProfileHeader = styled.div``
const StCloseBox = styled.div``



