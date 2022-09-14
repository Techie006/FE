import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "../../modules/redux/auth";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";
import axios from 'axios';

const KakaoLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const code = new URL(window.location.href).searchParams.get("code")

    const kakaoLogin = async () => {
        try {
            const resp = await axios.get(`http://magorosc.shop/user/kakao/callback?code=${code}`,{});
    
            localStorage.setItem("Authorization",resp.headers.authorization);
            localStorage.setItem("Refresh_Token",resp.headers.refresh_token);
            
            Swal.fire(
                '로그인에 성공하였습니다.',
                `${resp.data.status.message}`,
                'success'
              )
              console.log("con",resp.data)
            //   navigate("/home", { replace: true })
            dispatch(login());
        }
        catch(error) {
        }
        
    }
    useEffect(() => {
        kakaoLogin();
    }, []);
    return (
        <div>
        </div>
    );
};

export default KakaoLogin;