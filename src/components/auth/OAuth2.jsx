import React from 'react';
import googleLogin from "../../assets/icons/googleLogin.png"
import styled from "styled-components";

const OAuth2 = () => {

    const GOOGLE_CLIENT_ID = "230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com";
    const GOOGLE_REDIRECT_URI = "http://localhost:3000/googleLogin";
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com&redirect_uri=http://localhost:3000/googleLogin&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

    
    return (
        <StOAuthWrapper>
            <a href = {GOOGLE_AUTH_URL}>
                <StImg src = {googleLogin}/>
            </a>
        </StOAuthWrapper>
    );
};

export default OAuth2;

const StOAuthWrapper = styled.div``
const StImg = styled.img`
    width : 69%;
    height : 62px;
`