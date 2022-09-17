import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import OAuth from "./OAuth"
import OAuth2 from "./OAuth2"
// import GoogleLogin from './GoogleLogin';
// import RESP_WOO from "../../server/response_woo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Select from "react-select";
import { ErrorText, ValidateText } from "../../elements/texts/pageTexts"
import { login } from "../../modules/redux/auth";
import { user } from "../../modules/redux/userData";
// import SmallLinkWithHelper from '../../elements/links/SmallLinkWithHelper';
import axios from 'axios';

import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import styled from "styled-components";


const SigninForm = () => {
    const [currPage, setCurrPage] = useState(false);
    const [show, setShow] = useState(false);
    const [loginState, setLoginState] = useState({});
    const [signupValue, setSignupValue] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    
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
        formState: { errors },
      } = useForm({ mode: "submit" });
      // formState: { errors } 의 errors는 handleSubmit이 실행되고 난 후 
      // error가 발생하면 해당 error의 값들은 formState 객체 안의 errors에 담겨 있다.
      // errors 객체 형식은 아래와 같다.
      // errors."내가 지정한 input name"."내가 지정한 error message"
    const userId = watch("email") + "@" + selectDomain.value
    const loginUserId = watch("login_email") + "@" + selectDomain.value

    const pwCheck = (pw) => {
        let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regExp.test(pw);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pageChangeHandler = () => {
        if (
            watch("email") === "" &&
            watch("username") === "" &&
            watch("password") === "" &&
            watch("passwordCheck") === "" &&
            watch("login_email") === "" &&
            watch("login_password") === "" 
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
                                
            const resp = await axios.post("http://3.36.56.125/api/user/signup",{
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
            const resp = await axios.post("http://3.36.56.125/api/user/signin",{
                email : loginUserId,
                password : watch("login_password"),
            })
    
            localStorage.setItem("Authorization",resp.headers.authorization);
            
        

            setLoginState(resp.data)

            if (resp.data.result===true){
                Swal.fire(
                    '로그인에 성공하였습니다.',
                    `${resp.data.status.message}`,
                    'success'
                  )
                  dispatch(login());
                  dispatch(user(resp.data.content));
                  console.log("content",resp.data.content);
                  
                  navigate("/home", { replace: true })
                  
            }
        }
        // const {
        //     result,
        //     status: { message },
        //   } = RESP_WOO.AUTH.SIGN_UP_FAIL;
        
    }
    useEffect(() => {
        reset(signupValue);
    }, [signupValue]);

    return (
        <div>
            {currPage === true ?(
            <StyledSignUp>
            <form onSubmit = {handleSubmit(onSubmitHadler)}>
                <div>
                <InputTitle>이메일</InputTitle>
                <StyledEmailGroup>
                <input
                autoFocus
                className='email_input'
                type = "text"
                id = "email"
                placeholder="email"
                {...register("email",{
                required : "이메일을 입력해주세요."
                })}
                />
                <StyledGol>@</StyledGol>
                <StyledSelect
                styles={{ // 모바일 환경에서도 option 목록이 항상 위로 보이게 zIndex 설정함
                    domain : provided=> ({...provided, zIndex: 999}),
                }}
                onChange = {setSelectDomain}
                placeholder = "선택해주세요!"
                options={domain}
                />
                </StyledEmailGroup>
                </div>
                {errors.email ? (
                <ErrorText>{errors.email.message}</ErrorText>
                ):
                (
                null
                )}
                {errorMessage !== "" ? (
                    <ErrorText>{errorMessage}</ErrorText>
                ):
                (
                null
                )}
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
                null
                )}
                </div>
                <div>
                <InputTitle>비밀번호</InputTitle>
                <input
                type = {!show ? "password" : "text"}
                id = "password"
                placeholder="password"
                {...register("password",{
                    required : "패스워드를 입력해주세요.",
                   
                      validate: {
                        check: (value) =>
                          pwCheck(value) ||
                          "패스워드는 영문,숫자, 특수기호(@$!%*#?&)를 포함한 7자리~16자리 이내로 입력해주세요.",
                      },
                })}
                />
                {errors.password ? (
                    <ErrorText>{errors.password.message}</ErrorText>
                ) : (
                    null
                )}
                <div className='guide'>
                    패스워드는 영문,숫자, 특수기호(@$!%*#?&)를 포함한 7자리~16자리 이내로 입력해주세요.
                </div>

                </div>
                <div>
                <InputTitle>비밀번호 확인</InputTitle>
                <input
                type = {!show ? "password" : "text"}
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
                    <AiFillEye className='icon' />
                </button>
                ) : (
                <button className='show_button' onClick = {onShowHandler}>
                    <AiFillEyeInvisible className="icon" />
                </button>
                )}
                
                {(watch("passwordCheck") === "") && true ?
                (null
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
                <div onClick={pageChangeHandler}>로그인하기</div>
            </form>
            </StyledSignUp>
            ):
            (<StyledSignIn>
                <form onSubmit = {handleSubmit(onSubmitHadler)}>
                <InputTitle>이메일</InputTitle>
                <StyledEmailGroup>
                <input
                autoFocus
                type = "text"
                id = "email"
                placeholder="email"
                {...register("login_email",{
                required : "이메일을 입력해주세요."
                })}
                />
                <StyledGol>@</StyledGol>
                <StyledSelect
                styles={{ // 모바일 환경에서도 option 목록이 항상 위로 보이게 zIndex 설정함
                    domain : provided=> ({...provided, zIndex: 999}),
                }}
                // value = {domain.find(domain => {
                //     return domain.value === selectDomain
                // })}
                onChange = {setSelectDomain}
                placeholder = "선택해주세요!"
                options={domain}
                />
                </StyledEmailGroup>
                {errors.login_email ? (
                    <ErrorText>{errors.login_email.message}</ErrorText>
                ):
                (
                null
                )}
                <InputTitle>비밀번호</InputTitle>
                <input
                type = "password"
                id = "password"
                placeholder="password"
                {...register("login_password",{
                    required : "패스워드를 입력해주세요."
                })}
                />
                {loginState.result === false ? (
                <ErrorText>{loginState.status.message}</ErrorText>
                ):
                (
                null
                )}
                <input type="submit" className="submitButton" value = "로그인하기"/>
                <br/>
                <div>or</div>
                <br/>
                <OAuth/><br/>
                <OAuth2/><br/>
                <span>로그인 없이 이용하고 싶으시다면?</span>&nbsp;<NavLink to = "/">둘러보기!</NavLink>
                <br/>
                <br/>
                <a href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>이용약관</a>
                <a href = " https://dust-sulfur-10c.notion.site/2c4cd8fc0c91493abc3ffed858998727" target='_blank'>개인정보취급방침</a>
                <div onClick={pageChangeHandler}>회원가입하기</div>
                </form>
                </StyledSignIn>
                
            )}
            </div>
        
    );
};

export default SigninForm;

const StyledSignUp = styled.div`
    display : flex;
    flex-direction : column;
    margin : 10px 0px;
    input {
        width : 260px;
        height : 35px;
        margin-bottom : 10px;
        &:hover {
            border-color : red;
        }
    }
    .guide {
        font-size: 10px;
        margin-bottom : 15px;
    }
    .submitButton {
        display : flex;
        flex-direction : center;
        justify-content : center;
    }
    .show_button {
        border : 0px;
        background-color : white;
    }
    .icon {
        width : 20px;
        height : 20px;
    }
`
const InputTitle = styled.div`
    margin-bottom : 10px;
`
const StyledGol = styled.span`
    font-size : 20px;
    margin : 5px;
`
const StyledSelect = styled(Select)`
    width: 130px;
    border : 0px;
    position: relative;
    line-height: 14px;
    font-size: 13px;
    background-color : white;
    border : 0px;
    color : #black;

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
const StyledEmailGroup = styled.div`
      display : flex;
      align-items:center;
      margin : 0px;

      .email_input {
          width : 110px;
      }
`
const StyledGuide = styled.div`
`
const StyledSignIn = styled.div`
    display : flex;
    flex-direction : column;
    margin : 10px 0px;
    input {
        width : 160px;
        height : 30px;
        margin-bottom : 10px;

        &:hover {
            border-color : red;
            
        }
    }
    .submitButton {
        display : flex;
        flex-direction : center;
        justify-content : center;
    }
`