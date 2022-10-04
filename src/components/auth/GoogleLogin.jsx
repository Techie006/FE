// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../modules/redux/auth";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// const GoogleLogin = () => {
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const code = new URL(window.location.href).searchParams.get("code");

//   const googleLogin = async () => {
//     try {
//       const resp = await axios.get(
//         `https://magorosc.shop/user/google/callback?code=${code}`,
//         {}
//       );

//       localStorage.setItem("Authorization", resp.headers.authorization);
//       localStorage.setItem("Refresh_Token", resp.headers.refresh_token);

//       Swal.fire(
//         "로그인에 성공하였습니다.",
//         `${resp.data.status.message}`,
//         "success"
//       );
//       navigate("/home", { replace: true });
//       dispatch(login());
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     googleLogin();
//   }, []);

//   return (
//     <div></div>
//     // https://accounts.google.com/o/oauth2/v2/auth?client_id=230675215382-h29811lqdej9iikmiifbv5bk8eg0iass.apps.googleusercontent.com&redirect_uri=

//     // http://localhost:8080/user/google/callback

//     // &response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
//   );
// };

// export default GoogleLogin;
