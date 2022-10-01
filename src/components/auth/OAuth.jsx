import React from 'react';
import kakaoLogin from "../../assets/icons/kakao_login_large_narrow.png"
import styled from "styled-components";

const OAuth = () => {

    const KAKAO_CLIENT_ID = "2b986d1b574416a7d6d064619545aaff";
    const KAKAO_REDIRECT_URI = "http://localhost:3000/kakaoLogin";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <StyledOAuthWrapper>
            <StyledKakaoLogin>
                <a href={KAKAO_AUTH_URL}>
                    <StImg src ={kakaoLogin}/>
                </a>
            </StyledKakaoLogin>
        </StyledOAuthWrapper>
    );
};


export default OAuth;

const StyledOAuthWrapper = styled.div`
`
const StyledKakaoLogin = styled.div`
`
const StImg = styled.img`
    width : 329px;
    height : 50px;
`
