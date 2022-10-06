import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as ShowPW } from "../../assets/icons/auth/showPW.svg";
import { ReactComponent as HidePW } from "../../assets/icons/auth/hidePW.svg";
// import { FcAddImage } from "react-icons/fc";
import { ErrorText } from "../../styles/Text";
// import { ST3, ET1, T4 } from "../../../styles/Text";
// import { ReactComponent as CircleX } from "../../../assets/icons/classes/circleX.svg";
import { pwCheck } from "../../shared/regex";
import axios from 'axios';
import Swal from "sweetalert2";
import styled from "styled-components";
import Button from "../../elements/atoms/Button";
import { ReactComponent as X } from "../../assets/icons/common/X.svg";

const UpdateProfileModal = ({ onClose }) => {

    const navigate = useNavigate();

    const [showImg, setShowImg] = useState(false);
    const [imgUrl, setImgUrl] = useState([]);
    const [imgInfo, setImgInfo] = useState("선택된 사진이 없어요.");
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

      const userName = localStorage.getItem("username")
      const userImg = localStorage.getItem("profileImg")

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
            
        const resp = await axios.put("https://magorosc.shop/api/my/password",{
            present_password : watch("password"),
            check_password : watch("updatePw"),
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
            }
        }
        catch(error){
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
                <X className='x' onClick={onClose}/>
            </StProfileHeaderWrapper>

            {!curr ? (
                <div>
                <StProfileWrapper>
                    <StProfileImg onClick={()=> setCurr(true)} src={userImg}></StProfileImg>
                    <StUserName>
                        <div className='nickname'>닉네임</div>
                        <div className='user_name'>{userName}</div>
                    </StUserName>
                </StProfileWrapper>
            
            <StUpdatePwWrapper>
                <form onSubmit={handleSubmit(updateProfileHandler)}>
                    <StTitle>기존 비밀번호 입력</StTitle>
                    <div className='pwinput_wrapper'>
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
                              watch("updatePw") === value ||
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
            {/* 프로필 업로드 */}
            {/* <StPart hasError={errors.classImgs}>
              <ST3 as='label' htmlFor='classImgs'>
                썸네일 업로드
              </ST3>
              <StFilePicker>
                <StLabelBox className='input-file-button' htmlFor='classImgs'>
                  <StLabelText>파일 선택</StLabelText>
                </StLabelBox>
                <StFileInput type='text' value={imgInfo} onChange={() => {}} />
                <StWrapper>
                  <input
                    type='file'
                    style={{ display: "none" }}
                    accept='image/jpg, image/png, image/jpeg'
                    id='classImgs'
                    placeholder='이미지 파일 선택'
                    {...register("classImgs", {
                      required:
                        "신규 클래스 생성을 위해서 썸네일을 입력해주세요.",
                      onChange: (e) => changeImgHandler(e),
                    })}
                  /> */}
                  {/* 이미지 삭제 버튼 */}
                  {/* {showImg ? (
                    <StButton onClick={deleteHandler}>
                      <CircleX />
                    </StButton>
                  ) : null}
                </StWrapper>
              </StFilePicker>
              {errors.classImgs ? <ET1>{errors.classImgs.message}</ET1> : null}
            </StPart>
            <StImgPart>
              {!showImg ? (
                <StImgGuide>
                  <StGuideText>미리보기</StGuideText>
                  <StHelperText>썸네일 이미지 최대 20MB</StHelperText>
                </StImgGuide>
              ) : null}
              {showImg ? (
                <>
                  <StImg src={imgUrl[0]} alt='img' />
                </>
              ) : null}
            </StImgPart> */}
            {/* 프로필 업로드 */}
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
    .pwinput_wrapper {
        display : flex;
        flex-direction : row ;
        justify-content: space-between;
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
        margin : 40px auto;
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
    .btn-upload {
        width: 150px;
        height: 30px;
        background: #fff;
        border: 1px solid rgb(77,77,77);
        border-radius: 10px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #ADADAD;
          color: #5B5B5B;
        }
      }
      
      #file {
        display: none;
      }
`
const StModalContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 530px;
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
const StProfileImg = styled.img`
    width : 84px;
    height : 84px;
    border-radius : 100%;
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



