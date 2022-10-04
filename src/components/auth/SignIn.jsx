import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { signin } from "../../modules/redux/auth";
import { ReactComponent as Logo } from "../../assets/icons/Frigo.svg";
import { ReactComponent as Email } from "../../assets/icons/auth/email.svg";
import { ReactComponent as Password } from "../../assets/icons/auth/PW.svg";
import Button from "../../elements/atoms/Button";
import InfoLinks from "./service/InfoLinks";

const SignIn = ({ onClick }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    register,
    setError,
    clearErrors,
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

    if (!result) {
      // TODO 에러 처리
      console.log(message);
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
        <InfoLinks />
      </StLayout>
    </>
  );
};

export default SignIn;

const StLayout = styled.div`
  padding: 32px 37px;
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
