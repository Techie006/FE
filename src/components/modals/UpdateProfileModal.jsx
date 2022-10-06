import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as ShowPW } from "../../assets/icons/auth/showPW.svg";
import { ReactComponent as HidePW } from "../../assets/icons/auth/hidePW.svg";
import { FcAddImage } from "react-icons/fc";
import { ErrorText } from "../../styles/Text";
import { pwCheck } from "../../shared/regex";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";
import Button from "../../elements/atoms/Button";

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
        formState: { errors, isValid },
      } = useForm({ mode: "onChange" });

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
            console.log(resp)
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
                    <div>
                    <input
                        autoComplete='on'
                        className='present_pw'
                        type = {!show ? "password" : "text"}
                        id = "password"
                        {...register("password",{
                        required: "비밀번호를 기입하셔야 합니다.",
                        })}
                    />
                    </div>
                    <div>
                    <StButton onClick={onShowHandler}>
                    {show ? <ShowPW /> : <HidePW />}
                    </StButton>
                    </div>
                    </div>
                    {errors.password ? (
                    <ErrorText>{errors.password.message}</ErrorText>
                    ):
                    (
                    null
                    )}
                    
                    
                    {errorMessage !== "" ? 
                    (<ErrorText>{errorMessage}</ErrorText>)
                    : null}
                    <StTitle>새로운 비밀번호 입력</StTitle>
                    <div className='input_wrapper'>
                    <input
                        autoComplete='on'
                        className='update_pw'
                        type = {!show ? "password" : "text"}
                        id = "update_pw"
                        {...register("updatePw",{
                        required: "비밀번호를 기입하셔야 합니다.",
                        minLength: {
                            value: 8,
                            message: "비밀번호는 8자 이상이어야 합니다.",
                          },
                          maxLength: {
                            value: 15,
                            message: "비밀번호는 15자 이하여야 합니다.",
                          },
                        validate: {
                            type: (value) =>
                            pwCheck(value) || 
                            "비밀번호에 영문/숫자/특수문자(@$!%*#?&)를 모두 사용해야합니다."
                        }
                        })}
                    />
                    </div>
                    {updateErrorMessage !== "" ? 
                    (<ErrorText>{updateErrorMessage}</ErrorText>)
                    : null}

                    <StTitle>비밀번호 확인</StTitle>
                    <div className='input_wrapper'>
                    <input
                        autoComplete='on'
                        className='update_pw_confirm'
                        type = {!show ? "password" : "text"}
                        id = "update_password_confirm"
                        {...register("updatePwConfirm",{
                        required: "비밀번호를 다시 한 번 입력해주세요.",
                        validate: {
                            check: (value) =>
                              watch("password") === value ||
                              "비밀번호가 일치하지 않습니다.",
                          },
                        })}
                    />
                    </div>
                    {errors.updatePwConfirm ? (
                    <ErrorText>{errors.updatePwConfirm.message}</ErrorText>
                    ): null}
                    <input type="submit" className="submitButton" value = "수정하기"/>
  
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
    .input_wrapper {
        display : flex;
        flex-direction : row ;
        justify-content: flex-start;
        background-color : #FAFAFA;
        border: 0.6px solid #DADADA;
        border-radius: 6px;
        display : flex;
        flex-direction : row;
        padding : 11px 14px;
        align-items : center;
        
        width : 285px;
        height : 40px;
        margin-bottom : 2px;
    }
    .submitButton {
        display : flex;
        margin : 10px auto;
        background-color : #FFDD7C;
        border-radius: 8px;
        width : 123px;
        height : 36px;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: -0.005em;
        color: #482647;
        justify-content: space-around;
        padding : 10px 15px;
        :hover {
        background: #FFB356;
        color : #664500;   
        }
    }
`
const StModalContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 590px;
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
    padding : 30px 60px 40px 60px ;
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
`
const StTitle = styled.div`
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.5px;
    color: #4B4B4B;
    margin-bottom : 10px;
    margin-top : 10px;
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
const StButton = styled.div`
    width :22px;
    height : 11px;
    margin-bottom : 10px;

`



