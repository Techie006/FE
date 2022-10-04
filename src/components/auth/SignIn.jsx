import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { signin } from "../../modules/redux/auth";
import { ReactComponent as Logo } from "../../assets/icons/Frigo.svg";
import { ReactComponent as Email } from "../../assets/icons/auth/email.svg";
import { ReactComponent as Password } from "../../assets/icons/auth/PW.svg";
import Button from "../../elements/atoms/Button";
import OAuth from "./OAuth/OAuth";
import InfoLinks from "./service/InfoLinks";

const SignIn = ({ onClick }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const submitHandler = async ({ email, password }) => {
    const resp = await apis.sign_in({ email, password });

    const {
      result,
      content,
      status: { code, message },
    } = resp.data;

    // 서버 측 에러 처리
    if (!result) {
      switch (code) {
        case "205" || "206" || "207":
          setError(
            "email",
            // 가입되지 않은 이메일입니다 / 카카오로 가입된 유저입니다 / 구글로 가입된 유저입니다
            { type: "validate", message: message },
            { shouldFocus: true }
          );
          break;
        case "208":
          setError(
            "password",
            // 비밀번호를 잘못 입력하셨습니다
            { type: "validate", message: message },
            { shouldFocus: true }
          );
          break;
        case "209":
          // 이메일 인증을 완료해주세요.
          Swal.fire({
            title: message,
            text: "",
            icon: "warning",
            confirmButtonText: "확인",
            confirmButtonColor: "#74BDB2",
          });
          break;
        default:
          break;
      }
      return;
    }

    // localStorage에 유저 정보 저장
    const { authorization } = resp.headers;
    localStorage.setItem("Authorization", authorization);
    const { member_id, nickname, profile_img } = content;
    localStorage.setItem("userId", member_id);
    localStorage.setItem("username", nickname);
    localStorage.setItem("profileImg", profile_img);

    dispatch(
      signin({
        userInfo: {
          userId: member_id,
          username: nickname,
          profileImg: profile_img,
        },
      })
    );

    // 메인 화면으로 이동
    navigate("/");
  };

  return (
    <>
      <StLayout>
        <StHeader>
          <Logo />
        </StHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <StPart hasError={errors.email}>
            <StLabel htmlFor='email'>이메일</StLabel>
            <StWrapper>
              <StIcon>
                <Email />
              </StIcon>
              <StInput
                type='text'
                id='email'
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                })}
              />
            </StWrapper>
            {errors.email ? <StError>{errors.email.message}</StError> : null}
          </StPart>
          <StPart hasError={errors.password}>
            <StLabel htmlFor='password'>비밀번호</StLabel>
            <StWrapper>
              <StIcon>
                <Password />
              </StIcon>
              <StInput
                type='password'
                id='password'
                {...register("password", {
                  required: "비밀번호를 기입하셔야 합니다.",
                })}
              />
            </StWrapper>
            {errors.password ? (
              <StError>{errors.password.message}</StError>
            ) : null}
          </StPart>
          <Button
            type='submit'
            content='로그인'
            page='auth'
            func='signin'
            disabled={!isValid}
          />
        </form>
        <StFuncs>
          <StTab onClick={onClick}>회원가입</StTab>
          <StTab onClick={onClick}>비밀번호 찾기</StTab>
        </StFuncs>
        <StDivider>
          <StLine />
          <StOr>또는</StOr>
          <StLine />
        </StDivider>
        <StOAuths>
          <OAuth type='kakao' />
          <OAuth type='google' />
        </StOAuths>
        <InfoLinks />
      </StLayout>
    </>
  );
};

export default SignIn;

const StLayout = styled.div`
  padding: 32px 37px;
  border: 1px solid #ececec;
`;

const StHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`;

const StPart = styled.div`
  margin-bottom: ${(props) => (!props.hasError ? "26px" : "11px")};
`;

const StLabel = styled.label`
  position: relative;
  display: block;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
`;

const StWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const StIcon = styled.div`
  position: absolute;
  left: 25px;
  bottom: 10px;
`;

const StInput = styled.input`
  background: #fafafa;
  border: 1.2px solid #dadada;
  border-radius: 6px;
  width: 332px;
  height: 50px;
  margin-top: 6px;
  padding: 11px 14px 11px 60px;
  &:hover,
  &:focus {
    outline: none;
    border: 1.2px solid #ffb356;
  }
`;

const StHelper = styled.div`
  margin-top: 3px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: -0.5px;
  color: #656565;
`;

const StError = styled(StHelper)`
  color: #ff5c01;
`;

const StFuncs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const StTab = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  text-decoration-line: underline;
  color: #656565;
  &:hover {
    cursor: pointer;
  }
`;

const StDivider = styled.div`
  margin-top: 28px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StLine = styled.div`
  background: #d3d3d3;
  width: 131px;
  height: 1px;
`;

const StOr = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.5px;
  color: #a5a5a5;
`;

const StOAuths = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
