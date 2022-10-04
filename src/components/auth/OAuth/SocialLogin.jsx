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
      status: { message },
    } = resp.data;

    // accessToken, refreshToken 저장
    localStorage.setItem("Authorization", authorization);
    localStorage.setItem("Refresh_Token", refresh_token);

    Swal.fire("로그인에 성공하였습니다.", message, "success");

    dispatch(signin());

    // 메인화면으로 이동
    navigate("/");
  }, [type, code, dispatch, navigate]);

  useEffect(() => {
    oAuth();
  }, [oAuth]);

  return <></>;
};

export default SocialLogin;
