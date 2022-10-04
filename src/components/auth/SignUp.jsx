import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../../assets/icons/Frigo.svg";
import { emailCheck, usernameCheck, pwCheck } from "../../shared/regex";
import { ReactComponent as ShowPW } from "../../assets/icons/auth/showPW.svg";
import { ReactComponent as HidePW } from "../../assets/icons/auth/hidePW.svg";
import Button from "../../elements/atoms/Button";
import InfoLinks from "./InfoLinks";

const Signup = ({ onClick }) => {
  const [showPW, setShowPW] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // 비밀번호 보기 toggle 함수
  const clickHandler = () => {
    setShowPW((prev) => !prev);
  };

  return (
    <StLayout>
      <StHeader>
        <Logo />
        <StTab onClick={onClick}>로그인</StTab>
      </StHeader>
      <form>
        <StPart hasError={errors.email}>
          <StLabel htmlFor='email'>이메일</StLabel>
          <StInput
            type='text'
            id='email'
            {...register("email", {
              required: "이메일을 입력해주세요.",
              validate: {
                type: (value) =>
                  emailCheck(value) || "올바른 형식의 이메일이 아닙니다.",
              },
            })}
          />
          {errors.email ? <StError>{errors.email.message}</StError> : null}
        </StPart>
        <StPart hasError={errors.username}>
          <StLabel htmlFor='username'>닉네임</StLabel>
          <StHelper>
            3자에서 10자 사이의 영문/한글/숫자로만 구성할 수 있습니다.
          </StHelper>
          <StInput
            type='text'
            id='username'
            {...register("username", {
              required: "닉네임을 입력해주세요.",
              validate: {
                type: (value) =>
                  usernameCheck(value) || "올바른 형식의 닉네임이 아닙니다.",
              },
              minLength: {
                value: 3,
                message: "닉네임은 세 글자 이상이어야 합니다.",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 열 글자를 초과할 수 없습니다.",
              },
            })}
          />
          {errors.username ? (
            <StError>{errors.username.message}</StError>
          ) : null}
        </StPart>
        <StPart hasError={errors.password}>
          <StLabel htmlFor='password'>비밀번호</StLabel>
          <StHelper>
            영문/숫자/특수문자(@$!%*#?&) 세 가지 종류를 모두 포함한
            <StHelper />
            <StHelper>8자에서 15자 사이의 조합이어야합니다.</StHelper>
          </StHelper>
          <StWrapper htmlFor='password'>
            <StInput
              type={!showPW ? "password" : "text"}
              id='password'
              {...register("password", {
                required: "비밀번호를 기입하셔야 합니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다.",
                },
                maxLength: {
                  value: 15,
                  message: "비밀번호는 15자 이하여야 합니다.",
                },
                validate: {
                  check: (value) =>
                    pwCheck(value) ||
                    "비밀번호에 영문/숫자/특수문자(@$!%*#?&)를 모두 사용해야합니다.",
                },
              })}
            />
            <StButton onClick={clickHandler}>
              {!showPW ? <ShowPW /> : <HidePW />}
            </StButton>
          </StWrapper>
          {errors.password ? (
            <StError>{errors.password.message}</StError>
          ) : null}
        </StPart>
        <StPart hasError={errors.passwordCheck}>
          <StLabel htmlFor='passwordCheck'>비밀번호 확인</StLabel>
          <StInput
            type={!showPW ? "password" : "text"}
            id='passwordCheck'
            {...register("passwordCheck", {
              required: "비밀번호를 다시 한 번 입력해주세요.",
              validate: {
                check: (value) =>
                  watch("password") === value ||
                  "비밀번호가 일치하지 않습니다.",
              },
            })}
          />
          {errors.passwordCheck ? (
            <StError>{errors.passwordCheck.message}</StError>
          ) : null}
        </StPart>
        <Button
          type='submit'
          content='가입하기'
          page='auth'
          func='signup'
          disabled={!isValid}
        />
      </form>
      <InfoLinks />
    </StLayout>
  );
};

export default Signup;

const StLayout = styled.div`
  padding: 32px 37px;
`;

const StHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`;

const StTab = styled.div`
  position: absolute;
  top: 20px;
  right: 10px;
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
  padding: 11px 48px 11px 14px;
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

const StWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const StButton = styled.div`
  display: inline;
  position: absolute;
  left: 298px;
  bottom: 10px;
`;
