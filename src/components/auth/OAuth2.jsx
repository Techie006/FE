import React from 'react';

const OAuth2 = () => {

    const GOOGLE_CLIENT_ID = "230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com";
    const GOOGLE_REDIRECT_URI = "http://localhost:3000/googleLogin";
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com&redirect_uri=http://localhost:3000/googleLogin&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

    
    return (
        <div>
            <a href = {GOOGLE_AUTH_URL}>구글 로그인</a>
        </div>
    );
};

export default OAuth2;