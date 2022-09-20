import React from 'react';

import styled from "styled-components";

const OAuth = () => {

    const KAKAO_CLIENT_ID = "2b986d1b574416a7d6d064619545aaff";
    const KAKAO_REDIRECT_URI = "http://localhost:3000/kakaoLogin";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <StyledOAuthWrapper>
            <StyledKakaoLogin>
                <a href={KAKAO_AUTH_URL}>
                    <img src ="kakao_login_medium_narrow.png"/>
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
