import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { AiFillEye } from "react-icons/ai";
import { ErrorText } from "../../styles/Text";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";

const UpdateProfileModal = ({ onClose }) => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [updateErrorMessage, setUpdateErrorMessage] = useState("")
    const [curr, setCurr] = useState(false)
    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm({ mode: "submit" });
    const fileInput = useRef(null);
      
      const onShowHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShow((prev) => !prev)
    }

    const uploadUserProfile = async () => {
        const auth = localStorage.getItem("Authorization")
        const resp = await axios.put("https://magorosc.shop/api/my/profile",{
                    
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
        const resp = await axios.put("https://magorosc.shop/api/my/password",{
                
            present_password : watch("password"),
            change_password : watch("updatePwConfirm"),

            },{
                headers:{

                    "Authorization" : auth
                }
            })
            Swal.fire(
                '비밀번호 변경을 성공하였습니다!',
                '다시 로그인해 주시기 바랍니다.',
                'success'
              )
            localStorage.removeItem("Authorization")
            localStorage.removeItem("Refresh_Token")

            navigate("/auth")

        
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
    const handleChange = e => {
        console.log(e.target.file)
      };

    return (
        <StWrapper>
            <StModalContent>
            <StProfileHeaderWrapper>
            {!curr ? (<StProfileHeader>계정 설정</StProfileHeader>)
            : (<StProfileHeader>프로필 변경</StProfileHeader>)}
                <StCloseBox onClick ={onClose}>x</StCloseBox>
            </StProfileHeaderWrapper>

            {!curr ? (
                <div>
                <StProfileWrapper>
                    <StProfileImg><FcAddImage onClick={()=> setCurr(true)}/></StProfileImg>
                    <StUserName>
                        <div className='nickname'>닉네임</div>
                        <div className='user_name'>유저네임</div>
                    </StUserName>
                </StProfileWrapper>
            
            <StUpdatePwWrapper>
                <form onSubmit={handleSubmit(updateProfileHandler)}>
                    <StTitle>기존 비밀번호 입력</StTitle>
                    <div className='input_wrapper'>
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
                    </div>
                    {errors.password ? (
                    <ErrorText>{errors.password.message}</ErrorText>
                    ):
                    (
                    null
                    )}
                    {errorMessage !== "" ? 
                    (<ErrorText>{errorMessage}</ErrorText>)
                    :
                    (
                    <StBlank></StBlank>    
                    )}
                    <StTitle>새로운 비밀번호 입력</StTitle>
                    <div className='input_wrapper'>
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
                    </div>
                    {updateErrorMessage !== "" ? 
                    (<ErrorText>{updateErrorMessage}</ErrorText>)
                    :
                    (
                    <StBlank></StBlank>
                    )}
                    <StTitle>비밀번호 확인</StTitle>
                    <div className='input_wrapper'>
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
                    </div>
                    {errors.updatePwConfirm ? (
                    <ErrorText>{errors.updatePwConfirm.message}</ErrorText>
                    ):
                    (
                    <StBlank></StBlank>
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
            </div>
            ) : (
                <div>
                    <StProfileUpload>프로필 업로드</StProfileUpload>
                    <StUploadFileWrapper>
                    <input
                    type = "file"
                    ref={fileInput}
                    onChange={handleChange}
                    style={{
                            border : "none",
                            cursor : "pointer",
                            backgroundColor: "#D3D3D3",
                            borderRadius: "6px",
                            width : "200px",
                            height : "40px",
                            marginRight : "10px",
                    }}
                    />
                    <StFileUrl></StFileUrl>
                    </StUploadFileWrapper>
                    <StImg></StImg>
                    <StButtonWrapper>
                    <StChangeDefault>기본 이미지로 변경</StChangeDefault>
                    <button>저장하기</button>
                    </StButtonWrapper>
                </div>

            )}
            
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
    z-index : 990;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;

`
const StModalContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 534px;
    width: 405px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : white;
`
const StProfileWrapper = styled.div`
    display : flex;
    flex-direction : row;
`
const StProfileImg = styled.div`
    border : 1px solid black;
    width : 150px;
    height : 150px;
    margin : 16px 24px 4px 66px;
`
const StUserName =styled.div`
    margin-top : 49px;
    .nickname {
        margin-bottom : 7px;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: -0.5px;
        color: #4B4B4B;
    }
    .user_name {
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.005em;
        color: #5B5B5B;
    }
`
const StUpdatePwWrapper = styled.div`
    padding : 30px 0px 40px 66px ;
    input {
        width : 200px ;
        height : 18px;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.005em;
        color: #A5A5A5;
        border : 0px;
        background-color : #FAFAFA;
        :focus {
            outline : none;
        }
    .input_wrapper {
        background-color : #FAFAFA;
        border: 0.6px solid #DADADA;
        border-radius: 6px;
        display : flex;
        flex-direction : row;
        justify-content : center;
        align-items : center;
        paddign : 11px 14px;
        width : 285px;
        height : 40px;
    }
`
const StTitle = styled.div`
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.5px;
    color: #4B4B4B;
    margin-bottom : 10px;
`
const StProfileHeaderWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    padding : 20px 28px 16px 28px;
    font-weight: 900;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.005em;
    color: #4B4B4B;
    border-bottom: 1.5px solid #ECECEC;
`
const StProfileHeader = styled.div``
const StCloseBox = styled.div``
const StBlank = styled.div`
    width : 200px;
    height: 0.7rem;
`
const StProfileUpload = styled.div`
    margin : 28px 10px 28px 61px;
    font-weight: 700;
    font-size: 16px;
    color: #4B4B4B;
`
const StUploadFileWrapper = styled.div`
    display : flex;
    flex-direction : row;
    margin : 10px 0px 11px 61px;
`
const StChooseFile = styled.input`

`
const StFileUrl = styled.div`
    width : 187px;
    height : 40px;
    background: #FAFAFA;
    border: 0.6px solid #DADADA;
    border-radius: 6px;
    font-size: 14px;
    letter-spacing: -0.005em;
    color: #A5A5A5;
`
const StImg = styled.div`
    border : 1px solid black;
    width : 200px;
    height : 200px;
    margin : 0px auto;
`
const StButtonWrapper =styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    text-align :center;
    justify-content : center;
`
const StChangeDefault = styled.button`
    cursor : pointer;
    width : 124px;
    height : 34px;
    background-color: #FAFAFA;
    border: 0.6px solid #ECECEC;
    border-radius: 6px;
    margin-bottom : 40px;
    
`




