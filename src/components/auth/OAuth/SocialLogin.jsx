import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useCallback } from "react";
import Swal from "sweetalert2";

import { apis } from "../../../shared/axios";
import { signin } from "../../../modules/redux/auth";

const SocialLogin = ({ type }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(useParams());
  const code = new URL(window.location.href).searchParams.get("code");

  const oAuth = useCallback(async () => {
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

    localStorage.setItem("Authorization", authorization);
    localStorage.setItem("Refresh_Token", refresh_token);

    Swal.fire("로그인에 성공하였습니다.", message, "success");

    dispatch(signin());

    navigate("/");
  }, [type, code, dispatch, navigate]);

  useEffect(() => {
    oAuth();
  }, [oAuth]);

  return <></>;
};

export default SocialLogin;
