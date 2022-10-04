import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import Swal from "sweetalert2";

import { apis } from "../../../shared/axios";
import { signin } from "../../../modules/redux/auth";

const SocialLogin = ({ type }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // OAuth를 수행하기 위한 code를 url로부터 파싱
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const oAuth = useCallback(async () => {
    // 소셜 로그인 수행
    let resp = {};
    if (type === "google") {
      resp = await apis.sign_in_google({ code });
    }
    if (type === "kakao") {
      resp = await apis.sign_in_kakao({ code });
    }

    const { authorization, refresh_token } = resp.headers;

    const {
      result,
      content,
      status: { code, message },
    } = resp.data;

    // TODO result
    // login 페이지 가고, 에러 메시지 보이게

    // accessToken, refreshToken 저장
    localStorage.setItem("Authorization", authorization);
    localStorage.setItem("RefreshToken", refresh_token);

    const { member_id, username, profile_img } = content;
    localStorage.setItem("userId", member_id);
    localStorage.setItem("username", username);
    localStorage.setItem("profileImg", profile_img);

    Swal.fire({
      icon: "success",
      title: `${username}님 환영합니다!`,
      showConfirmButton: false,
      timer: 1000,
    });

    dispatch(
      signin({
        userInfo: {
          userId: member_id,
          username: username,
          profileImg: profile_img,
        },
      })
    );

    // 메인화면으로 이동
    navigate("/");
  }, [type, code, dispatch, navigate]);

  useEffect(() => {
    oAuth();
  }, [oAuth]);

  return <></>;
};

export default SocialLogin;
