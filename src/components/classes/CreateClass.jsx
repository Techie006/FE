import { useState } from "react";
import { useForm } from "react-hook-form";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import Modal from "../../elements/templates/Modal";
import { H3, ErrorText } from "../../styles/Text";
import Button from "../../elements/atoms/Button";

const CreateClass = ({ onClick }) => {
  const defaultImgUrl =
    "data:image/jpeg;base64,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";
  const [showImg, setShowImg] = useState(false);
  const [imgUrl, setImgUrl] = useState([defaultImgUrl]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ mode: "onChange" });

  const changeImgHandler = async (e) => {
    const files = e.target.files;
    const fileList = Array.from(files);

    // 선택된 파일 없으면 보여주지 않음.
    if (fileList.length === 0) {
      return;
    }

    // 선택한 파일의 이미지 url을 추출해 저장
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    setImgUrl([...urlList]);
    setShowImg(true);
  };

  const clickHandler = () => {
    setImgUrl([defaultImgUrl]);
    setShowImg(false);
    resetField("classImg");
  };

  // TODO 모달 닫고 페이지 이동!
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
            accept='image/jpg, image/png, image/jpeg'
            id='classImg'
            placeholder='이미지 파일 선택'
            {...register("classImg", {
              required: "신규 클래스 생성을 위해서 썸네일을 입력해주세요.",
              onChange: (e) => changeImgHandler(e),
            })}
          />
          {errors.classImg ? (
            <ErrorText>{errors.classImg.message}</ErrorText>
          ) : null}
          <StImgWrapper>
            <StImg src={imgUrl[0]} alt='img' />
            {showImg ? (
              <Button
                isIcon={true}
                icon={faX}
                size='s3'
                onClick={clickHandler}
              />
            ) : null}
          </StImgWrapper>
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

const StImgWrapper = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
`;

const StImg = styled.img`
  width: 100%;
  box-shadow: ${(props) => props.theme.modal.layout.boxShadow};
`;
