import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Google } from "../../../assets/icons/auth/googleLogo.svg";

const OAuth = ({ type }) => {
  const currUrl = "http://localhost:3000";

  const KAKAO_CLIENT_ID = "2b986d1b574416a7d6d064619545aaff";
  const KAKAO_REDIRECT_URI = `${currUrl}/kakaoLogin`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const GOOGLE_CLIENT_ID =
    "230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com";
  const GOOGLE_REDIRECT_URI = `${currUrl}/googleLogin`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com&redirect_uri=${currUrl}/googleLogin&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <StLayout to={type === "kakao" ? KAKAO_AUTH_URL : GOOGLE_AUTH_URL}>
      <Google />
    </StLayout>
  );
};

export default OAuth;

const StLayout = styled(Link)`
  width: 329px;
  height: 50px;
  border-radius: 6px;
  background: #fee500;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.5px;
  color: #000000;
`;
