import { useForm } from "react-hook-form";
import styled from "styled-components";

import Modal from "../../elements/templates/Modal";
import { H3, ErrorText } from "../../styles/Text";
import Button from "../../elements/atoms/Button";

const CreateClass = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  // 모달 닫고 페이지 이동!
  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <>
      <Modal onClick={onClick}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <H3 as='label' htmlFor='className'>
            클래스명
          </H3>
          <StInput
            type='text'
            id='className'
            placeholder='클래스명 입력'
            {...register("className", {
              required: "신규 클래스 생성을 위해서 클래스명을 입력해주세요.",
            })}
          />
          {errors.className ? (
            <ErrorText>{errors.className.message}</ErrorText>
          ) : null}
          <H3 as='label' htmlFor='classImg'>
            클래스 썸네일
          </H3>
          <StInput
            type='file'
            id='classImg'
            placeholder='이미지 파일 선택'
            {...register("classImg", {
              required: "신규 클래스 생성을 위해서 썸네일을 입력해주세요.",
            })}
          />
          {errors.classImg ? (
            <ErrorText>{errors.classImg.message}</ErrorText>
          ) : null}
          <H3 as='label' htmlFor='recipeId'>
            레시피번호
          </H3>
          <StInput
            type='number'
            id='recipeId'
            placeholder='레시피 번호 입력'
            {...register("recipeId", {
              required: "신규 클래스 생성을 위해서 레시피 번호를 입력해주세요.",
            })}
          />
          {errors.recipeId ? (
            <ErrorText>{errors.recipeId.message}</ErrorText>
          ) : null}
          <Button type='submit' content='클래스 생성하기' page='modal' />
        </form>
      </Modal>
    </>
  );
};

export default CreateClass;

const StInput = styled.input`
  display: block;
  margin: auto;
  width: calc(100% - 120px);
  // layout
  background: ${(props) => props.theme.input.layout.background};
  border: ${(props) => props.theme.input.layout.border};
  border-radius: ${(props) => props.theme.input.layout.borderRadius};

  // content
  font-size: ${(props) => props.theme.input.content.fontSize};
  font-weight: ${(props) => props.theme.input.content.fontHeight};
  line-height: ${(props) => props.theme.input.content.lineHeight};

  // colors
  color: ${(props) => props.theme.input.colors.text};

  &:hover {
    cursor: text;
  }
`;
