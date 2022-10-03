import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import ServiceInfo from './ServiceInfo';
import OAuth from "./OAuth"
import OAuth2 from "./OAuth2"
import GridTemplate from "../../elements/templates/GridTemplate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { ErrorText } from "../../styles/Text";
import { login } from "../../modules/redux/auth";
import { user } from "../../modules/redux/userData";
import axios from 'axios';
import userIcon from "../../assets/icons/userIcon.png"
import pwIcon from "../../assets/icons/pwIcon.png"
import visibleIcon from "../../assets/icons/visibleIcon.png"

import Swal from "sweetalert2";
import styled from "styled-components";


const SigninForm = () => {
    const [currPage, setCurrPage] = useState(false);
    const [show, setShow] = useState(false);
    const [loginState, setLoginState] = useState({});
    const [signupValue, setSignupValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [pwValidation, setPwValidation] = useState({});

    var domain = [
        {value : "naver.com", label : "naver.com"},
        {value : "gmail.com", label : "gmail.com"},
        {value : "nate.com", label : "nate.com"},
        {value : "daum.net", label : "daum.net"},
        {value : "hanmail.net", label : "hanmail.net"},
        {value : "icloud.com", label : "icloud.com"},
    ]
    var [selectDomain, setSelectDomain] = useState(domain[0].value);
    
    const {
        register,
        watch,
        reset,
        handleSubmit,
        getValues,
        formState: { errors },
      } = useForm({ mode: "submit" });
      // formState: { errors } 의 errors는 handleSubmit이 실행되고 난 후 
      // error가 발생하면 해당 error의 값들은 formState 객체 안의 errors에 담겨 있다.
      // errors 객체 형식은 아래와 같다.
      // errors."내가 지정한 input name"."내가 지정한 error message"
    const userId = watch("email") + "@" + selectDomain
    const loginUserId = watch("login_email")

    const pwCheck = (pw) => {
        let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regExp.test(pw);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const pageChangeHandler = () => {
        if (
            watch("email") == "" &&
            watch("username") == "" &&
            watch("password") == "" &&
            watch("passwordCheck") == "" &&
            watch("login_email") == "" &&
            watch("login_password") == "" 
        ){
            setCurrPage((prev) => !prev)
        }else{
            Swal.fire({
                title : "진행하시겠습니까?",
                text: "페이지를 벗어나시면 작성하신 내용이 모두 소실됩니다.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    setCurrPage((prev) => !prev)
                    setSignupValue({
                        email : "",
                        username : "",
                        login_email : "",
                        login_password : "",
                        password : "",
                        passwordCheck : "",
                    })
                }
              })
        }
    }
    const onShowHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShow((prev) => !prev)
    }
    
    const onSubmitHadler = async () => {
        
        try{
        if ( currPage === true ) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center-center',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                },
                customClass : {
                    // 나중에 디자인 할때 공부
                }
            })
            Toast.fire({
                icon: 'info',
                title: "인증메일 전송 중입니다."
            })             
            const resp = await axios.post("https://magorosc.shop/api/user/signup",{
                email : userId,
                username : watch("usename"),
                password : watch("password"),

            })
            const loginResult = resp.data
                setLoginState(loginResult)
                
                if (loginResult.result === true) {
                setCurrPage(false);
                Swal.fire(
                    '메일 전송이 완료되었습니다.',        
                    '가입하신 메일로 인증 후에 이용 가능합니다.',
                    'success',
                  ); 
                  setSignupValue({
                      email : "",
                      username : "",
                      login_email : "",
                      login_password : "",
                      password : "",
                      passwordCheck : "",
                  })
                }
                }
        }
        catch (error) {
            setErrorMessage(error.response.data.status.message)
        }
        if( currPage === false ) {
            try{
            const resp = await axios.post("https://magorosc.shop/api/user/signin",{
                email : loginUserId,
                password : watch("login_password"),
            })
    
            localStorage.setItem("Authorization",resp.headers.authorization);
            
            if (resp.data.result===true){
                Swal.fire({
                    icon: 'success',
                    title: '로그인에 성공하셨습니다.',
                    html: `${resp.data.status.message}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  dispatch(login());
                  dispatch(user(resp.data.content));
                  navigate("/home", { replace: true })
                }
            } 
            catch(error) {
                console.log(error)
                
                if (error.response.data.status.message == "비밀번호를 잘못 입력하셨습니다.") {
                    setLoginState("")
                    setPwValidation(error.response.data)
                } else {
                    setLoginState(error.response.data)
                }
            }
        }

    }
    useEffect(() => {
        reset(signupValue);
    }, [signupValue]);

    const selectStyle = {
        valueContainer: (provided) => ({
            ...provided,
            height : '50px',
            width : '85px',
            padding : "0px"
        }),
        placeholder: (provided) => ({
            ...provided,
            height : '18px',
            width : '85px',
        }),
        Input : (provided) => ({
            ...provided,
            height : '40px',
            width : '128px',
            margin : "0px"
        }),
        singleValue : (provided) => ({
            ...provided,
            height : '18px',
            width : '84px',
            color : '#656565',
            fontWeight: "400",
            fontSize: "14px",
            margin : '0px',
            letterSpacing: "-0.005em"
        }),
        control : (provided) => ({
            ...provided,
            margin : '0px auto',
            height : '50px',
            minHeight : '50px',
            backgroundColor : '#FAFAFA',
            border: '1.19856px solid #DADADA',
            borderRadius: '6px',
            boxShadow: `0 0 0 0 'orange'`,
            '&:hover' : { textDecoration: 'none' },
            '&:focus-within' : { borderColor : "#FFB356" }
        }),
        indicatorsContainer : (provided) => ({
            ...provided,
            width : '33px',
            height : '33px',
            minHeight : '50px'
        })
    }

    return (
        
        <StWrapper>
            {currPage === true ?(
        <GridTemplate className="signUp_grid">
            <StSignUpSection>
            <StSignUpWrapper>
            <StHeaderWrapper>
            <div className='signup_title'>Frigo</div>
            <div className='go_signup' onClick={pageChangeHandler}>로그인</div>
            </StHeaderWrapper>
            <form onSubmit = {handleSubmit(onSubmitHadler)}>    
            <StEmailWrapper>
                <div className='email_label'>이메일</div>
                <StEmailGroup>
                <input
                className='email_input'
                type = "text"
                placeholder="email"
                {...register("email",{
                required : "이메일을 입력해주세요."
                })}
                />
                <StGol>@</StGol>
                <StyledSelect
                styles={selectStyle}
                onChange = {setSelectDomain}
                placeholder = "선택해주세요!"
                options={domain}
                />
                </StEmailGroup>
                {errors.email ? (
                <ErrorText>{errors.email.message}</ErrorText>
                ):
                (
                <Blank/>
                )}
                {errorMessage !== "" ? (
                    <ErrorText>{errorMessage}</ErrorText>
                ):
                (
                    null
                )}
                </StEmailWrapper>
                <div>
                <InputTitle>유저네임</InputTitle>
                <input
                type = "usename"
                id = "usename"
                placeholder="usename"
                {...register("usename",{
                    required : "유저네임을 입력해주세요."
                })}
                />
                {errors.usename ? (
                <ErrorText>{errors.usename.message}</ErrorText>
                ):
                (
                <Blank/>
                )}
                </div>
                <div>
                <InputTitle className='pw'>비밀번호</InputTitle>
                <input
                type = {!show ? "password" : "text"}
                id = "password"
                placeholder="password"
                {...register("password",{
                    required : "패스워드를 입력해주세요.",
                   
                      validate: {
                        check: (value) =>
                          pwCheck(value) ||
                          "영문, 숫자, 특수기호(@$!%*#?)를 포함한 7자리~16자리 이내로 입력해주세요!",
                      },
                })}
                />
                {errors.password ? (
                    <StErrorText>{errors.password.message}</StErrorText>
                ) : (
                    <Blank/>
                )}
                </div>
                <div>
                <InputTitle className='pw_check'>비밀번호 확인</InputTitle>
                <StPwConfirmWrapper>
                <input
                type = {!show ? "password" : "text"}
                className='password_check'
                id = "passwordCheck"
                placeholder="passwordCheck"
                {...register("passwordCheck",{
                    required : "패스워드가 일치하는지 확인해 주세요.",
                    validate : {
                        check : (value) => 
                        watch("password") === value || "비밀번호가 일치하지 않습니다."
                    }
                })}
                />
                {!show ? (
                <button className='show_button' onClick = {onShowHandler}>
                    <img src={visibleIcon} style={{
                        width : '22px',
                        height : '16px',
                        backgroundColor : '#FAFAFA'
                    }}/>
                </button>
                ) : (
                <button className='show_button' onClick = {onShowHandler}>
                    <img src={visibleIcon} style={{
                        width : '22px',
                        height : '16px',
                        backgroundColor : '#FAFAFA'
                    }}/>
                </button>
                )}
                </StPwConfirmWrapper>
                
                {(watch("passwordCheck") === "") && true ?
                (<Blank/>
                ) : (errors.passwordCheck ? (
                    <ErrorText>{errors.passwordCheck.message}</ErrorText>
                ) : (
                    null
                ))}
                
                </div>
                <input type="submit" className="submitButton" value = "회원가입하기"/>
                <a href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>이용약관</a>
                <a href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>개인정보취급방침</a>
                {/* 이 부분 element로 수정하기 link 훅은 내부로만 이동가능 외부링크 가능한 형식으로 바꿔줄 것 
                target='_blank' <- 새창열기  */}
            </form>
            </StSignUpWrapper>
            </StSignUpSection>
            </GridTemplate>
            ):
            (<GridTemplate>
                {/* <StSigninLayout> */}
                    <StServiceInfoSection>
                        <ServiceInfo/>
                    </StServiceInfoSection>
                    <StSignInSection>
                <StSignInWrapper>
                <form onSubmit = {handleSubmit(onSubmitHadler)}>
                <StSignInTitle>Frigo</StSignInTitle>
                <StInputWrapper>
                <div className='email_wrapper'>
                <UserIcon className='user' src={userIcon} />
                <input
                type = "text"
                id = "email"
                placeholder="email"
                {...register("login_email",{
                required : "이메일을 입력해주세요."
                })}
                />
                </div>
                <div>
                {errors.login_email ? (
                    <ErrorText>{errors.login_email.message}</ErrorText>
                ):
                (
                null
                )}
                {loginState.result === false ? (
                <ErrorText>{loginState.status.message}</ErrorText>
                ):
                (
                <Blank/>
                )}
                </div>
                </StInputWrapper>
                <StInputWrapper>
                <div className='pw_wrapper'>
                <UserIcon className='pw' src={pwIcon} />
                <input
                type = "password"
                id = "password"
                placeholder="비밀번호"
                {...register("login_password",{
                    required : "비밀번호를 입력해주세요."
                })}
                />
                </div>
                {errors.login_password ? (
                    <ErrorText>{errors.login_password.message}</ErrorText>
                ) : (
                    null
                )}
                {pwValidation.result == false ? (
                    <ErrorText>{pwValidation.status.message}</ErrorText>
                ) : (
                    <Blank/>
                )}
                </StInputWrapper>
                <StInputButton className = 'submit_button'>
                <input type="submit" className="submitButton" value = "로그인"/> 
                <div className='signup_find_box'>
                    <div className='go_signup' onClick={pageChangeHandler}>회원가입하기</div>               
                    <div className='go_findPw'>비밀번호 찾기</div>
                </div>
                </StInputButton>
                <div className='middle_wrapper'>
                <div className='middle_border'/>
                <div className='middle_border'/>
                <div className='middle_textbox'>또는</div>
                </div>
                <OAuth/>
                <OAuth2/>
                <a className='helper' href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>이용약관</a>
                <a className='helper' href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>개인정보취급방침</a>
                
                </form>
                </StSignInWrapper>
                </StSignInSection>
                {/* </StSigninLayout> */}
                </GridTemplate>
                
            )}
            </StWrapper>
        
    );
};

export default SigninForm;

const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;
const StWrapper = styled.div`
    letter-spacing: -0.5px;
    a {
        font-weight: 400;
        font-size: 12px;
        line-height: 17px;
        align-items: center;
        text-align: center;
        letter-spacing: -0.5px;
        color: #5B5B5B;
        margin-right : 10px;
        text-decoration: none;
    }
`
const StSignUpSection = styled(StGrid)`
        grid-column: 1 / span 12;

        /* mobile */
        @media all and (max-width: 600px) {
        grid-column: 1 / span 4;
        }
`
const StHeaderWrapper =styled.div`
    display : flex;
    flex-direction : row;
    justify-content : space-between;
    .go_signup {
        margin-top :56px;
        margin-left : 23px;
        color : ${(props) => props.theme.colors.font.gray3};
        text-decoration-line: underline;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        cursor : pointer;
    }
    .signup_title {
        font-family: Snug FREE;
        color: #F07401;
        margin-left : 111px;
        font-size : 40px;
        font-weight : bold;
        letter-spacing: 1px;
        margin-top : 32px;
    }
`
const StEmailWrapper = styled.div`
    display : flex;
    flex-direction : column;
    .email_label {
        margin-top : 18px;
        text-align : left;
        margin-bottom : 6px;
    }
    .email_input {
        background: #FAFAFA;
        border: 1.19856px solid #DADADA;
        font-weight : 400;
        border-radius: 6px;
        width : 163px;
        height : 50px;
        margin : 0px;
        padding : 16px 14px;
        font-size : 14px;
    }
`
const StSignUpWrapper = styled.div`
    display : flex;
    flex-direction : column;
    text-align : center;
    width : 406px;
    height : 670px;
    background-color : ${(props) => props.theme.colors.background.white};
    border : 1px solid #ECECEC;
    margin :0px auto;
    padding : 37px;
    padding-top : 0px;

    input {
        width : 95%;
        font-size : 70%;
        height : 50px;
        background: #FAFAFA;
        border: 1.19856px solid #DADADA;
        border-radius: 6px;
        padding : 16px 14px;
        outline : none;
        margin-bottom: 4px;
    }
    input:focus {
        border: 1.19856px solid #FFB356;
    }
    .submitButton {
        margin-top : 40px;
        align-items : center;
        background-color : #FC9700;
        border : 1px solid #F07401;
        border-radius : 6px;
        color : #FAFAFA;
        font-weight : 700;
        font-size : 20px;
        margin-bottom : 10px;
    }
    .show_button {
        border : 0px;
        background-color : white;
    }
    .pw { 
        margin-top : 26px;
    }
    .pw_check {
        margin-top : 26px;
    }

`
const StPwConfirmWrapper = styled.div`
    width : 332px;
    height : 53px;
    border: 1.19856px solid #DADADA;
    border-radius: 6px;
    background: #FAFAFA;
    margin-bottom : 4px;
    .password_check {
        width : 290px;
        margin-left : -4px;
        border : 0px;
        background: #FAFAFA;
        :focus {
            border : 0px;
        }
    }
    :focus-within {
        border-color : #FFB356;
    }
`
const InputTitle = styled.div`
    margin-top : 26px;
    margin-bottom : 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color : #282828;
    text-align : left;
`
const StGol = styled.span`
    font-size : 16px;
    margin-right : 11px;
    margin-left : 11px;
`
const StyledSelect = styled(Select)`
    width: 129px;
    font-size: 14px;

`
const StEmailGroup = styled.div`
    display : flex;
    flex-direction : row;
    justify-content : center;
    text-align : center;
    align-items: center;
    margin : 0px auto;
    margin-bottom :4px;  
`
//////// sign in ////////
const StServiceInfoSection = styled(StGrid)`
  grid-column: 1 / span 7;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
const StSignInSection = styled(StGrid)`
  
  grid-column: 8 / span 5;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StSignInTitle = styled.div`
    font-family: Snug FREE;
    color: #F07401;
    font-size : 40px;
    font-weight : bold;
    letter-spacing: 1px;
    margin-top : 32px;
`
const StSignInWrapper = styled.div`
    display : flex;
    flex-direction : column;
    text-align : center;
    border : 1px solid #ECECEC;
    width : 80%;
    height : 90%;
    margin : 38px 40px 38px 40px;
    input {
        width : 95%;
        font-size : 70%;
        display : flex;
        border : 0px;
        text-align : left;
        background-color : #FAFAFA;
    }
    input:focus { 
        outline : none;
    }
    .email_wrapper {
        display : flex;
        padding : 17px 0px 3px 8%;
        margin-bottom : 10px;
        align-items: center
    }
    .pw_wrapper {
        display : flex;
        padding : 17px 0px 3px 8%;
        margin-bottom : 10px;
        align-items: center
    }
    .submitButton {
        background-color : #FC9700;
        padding : 0px;
        margin : 11px auto;
        justify-content : center;
        color : #FAFAFA;
        font-size : 20px;
        font-weight : 700;
    }
    .go_signup {
        width : 131px;
        border-bottom : 1px solid #D3D3D3;
        text-align : left;
    }
    .go_findPw {
        width : 131px;
        border-bottom : 1px solid #D3D3D3;
        text-align : right;
    }
    .signup_find_box {
        font-size : 12px;
        color : #656565;
        height : 64px;
        padding-top : 10px;
        display : flex;
        flex-direction : row;
        justify-content : space-between;
    }
    .middle_wrapper {
        display : flex;
        
        justify-content : space-between;
    }
    .middle_border {
        padding-bottom : 38px;
        border-bottom : 1px solid #D3D3D3;
    }
    .middle_textbox {
        width : 67px;
        margin : 0px auto;
        margin-top : 30px;
        margin-bottom : 16px;
        font-size : 14px;
        color : #A5A5A5;
        background-color : #FFFFFF;
    }
    .helper {
        margin : 5px;
        font-size : 14px;
        color : #A5A5A5;
    }

`
const StInputWrapper = styled.div`
    width :  calc(100% - 100px);
    height : 50px;
    margin : 28px auto;
    border : 1.2px solid #DADADA;
    border-radius : 6px;
    background-color : #FAFAFA;
    :focus-within {
        border: 1.19856px solid #FFB356;
    }
    .password {
        width : 250px;
    }
`
const StInputButton =styled.div`
    width : calc(100% - 100px);
    height : 50px;
    margin : 28px auto;
    border : 1.2px solid #DADADA;
    background-color : #FC9700;
    border : 1px solid #F07401;
    border-radius : 6px;
`
const UserIcon = styled.img`
    width : 14px;
    height : 14px;
    margin-right : 4%;
    padding : 2px;
`
const Blank = styled.div`
    height : 11.2px;
    width : 200px;
`
const StErrorText = styled.div`
    color : #FF5C01;
    font-weight : 500;
    font-size : 11px;
    letter-spacing : -1px;
    text-align : left;
`