import styled from "styled-components";

import { ReactComponent as Google } from "../../../assets/icons/auth/googleLogo.svg";

const OAuth = ({ type }) => {
  const currUrl = "http://localhost:3000";

  // https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252FkakaoLogin%26through_account%3Dtrue%26client_id%3D2b986d1b574416a7d6d064619545aaff
  const KAKAO_CLIENT_ID = "2b986d1b574416a7d6d064619545aaff";
  const KAKAO_REDIRECT_URI = `${currUrl}/kakaoLogin`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const GOOGLE_CLIENT_ID =
    "230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com";
  const GOOGLE_REDIRECT_URI = `${currUrl}/googleLogin`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com&redirect_uri=${currUrl}/googleLogin&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

  return (
    <StLayout
      href={type === "kakao" ? KAKAO_AUTH_URL : GOOGLE_AUTH_URL}
      type={type}
    >
      <Google />
      <div>{type === "kakao" ? "카카오 로그인" : "구글 로그인"}</div>
    </StLayout>
  );
};

export default OAuth;

const StLayout = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12px;
  gap: 90px;

  width: 329px;
  height: 50px;
  border-radius: 6px;
  background: ${(props) => (props.type === "kakao" ? "#fee500" : "#ffffff")};
  border: ${(props) =>
    props.type === "kakao" ? "1px solid #fee500" : "1px solid #dadada"};
  border-radius: 6px;

  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.5px;
  text-decoration: none;
  color: #000000;
`;
