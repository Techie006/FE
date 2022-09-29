import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { apis } from "../../../shared/axios";
import { openModal, closeModal } from "../../../modules/redux/cookingClass";
import Modal from "../../../elements/templates/Modal";
import { ST3, ET1, T4 } from "../../../styles/Text";
import { ReactComponent as X } from "../../../assets/icons/circleX.svg";
import Button from "../../../elements/atoms/Button";

const CreateModal = ({ onClick }) => {
  const modalOpen = useSelector((state) => state.cookingClass.modalOpen);
  const selectedRecipe = useSelector(
    (state) => state.cookingClass.selectedRecipe
  );
  const dispatch = useDispatch();

  const defaultImgUrl =
    "data:image/jpeg;base64,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";
  const [showImg, setShowImg] = useState(false);
  const [imgUrl, setImgUrl] = useState([defaultImgUrl]);
  const [imgInfo, setImgInfo] = useState("선택된 사진이 없어요.");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ mode: "onChange" });

  // 사용자가 모달창 각 인풋필드 포커스 시 동작
  const focusHandler = (e) => {
    // 사용자가 특정 인풋필드 내용 변경 시도 시 기존 에러 삭제
    // setErrors((prev) => {
    //   delete prev[focused];
    //   return prev;
    // });

    // 사용자가 모달창의 검색창 포커스 시, SearchModal 엶
    dispatch(openModal());
  };

  // 모달 창 내부 이미지 미리보기 처리 함수
  // (향후 여러장 업로드로 바뀔 수 있으므로 확장성 있는 함수로 설계)
  const changeImgHandler = async (e) => {
    const files = e.target.files;

    const fileList = Array.from(files);
    console.log(fileList);

    // 선택된 파일 없으면 보여주지 않음.
    if (fileList.length === 0) {
      setImgUrl([]);
      setImgInfo("선택된 파일이 없어요.");
      setShowImg(false);
      return;
    }

    // 선택한 파일의 이미지 url을 추출해 저장
    const urlList = fileList.map((file) => URL.createObjectURL(file));

    // 선택한 파일의 이름이나 개수에 대한 정보를 저장
    if (fileList.length === 1) {
      setImgInfo(`${fileList[0].name}`);
    } else {
      setImgInfo(`${fileList.length}개 사진을 선택했어요.`);
    }

    setImgUrl(urlList);
    setShowImg(true);
  };

  // 이미지 미리보기 내의 X 버튼 클릭시 이미지 사라짐
  const clickHandler = () => {
    setImgUrl([defaultImgUrl]);
    setShowImg(false);
    resetField("classImgs");
  };

  // 클래스 생성
  const submitHandler = async ({ className, classImgs, recipeId }) => {
    const resp = await apis.create_class({
      recipe_id: recipeId,
      class_name: className,
      files: classImgs,
    });
    const {
      content,
      status: { code, message },
    } = resp.data;
    if (code === 400) {
      alert(message);
      return;
    }
    const { redis_class_id } = content;
    navigate(`/class/${redis_class_id}/publisher`);
  };

  return (
    <>
      <Modal header='클래스 생성하기' onClick={onClick} depth={1}>
        <StLayout>
          <form onSubmit={handleSubmit(submitHandler)}>
            <StNamePart>
              <ST3 as='label' htmlFor='className'>
                클래스명
              </ST3>
              <StInput
                type='text'
                id='className'
                placeholder='클래스명 입력'
                {...register("className", {
                  required:
                    "신규 클래스 생성을 위해서 클래스명을 입력해주세요.",
                })}
              />
              {errors.className ? <ET1>{errors.className.message}</ET1> : null}
            </StNamePart>
            <StRecipePart>
              <ST3 as='label' htmlFor='recipeId'>
                레시피 검색
              </ST3>
              <StSearchBar
                type='text'
                placeholder='레시피명 검색'
                id='recipe'
                onFocus={focusHandler}
                onChange={focusHandler}
                value={selectedRecipe?.recipe_name || ""}
                {...register("recipe", {
                  required:
                    "신규 클래스 생성을 위해서 해당하는 레시피를 입력해주셔야해요.",
                })}
              />
              {errors.recipe ? <ET1>{errors.recipe.message}</ET1> : null}
            </StRecipePart>
            <StFilePart>
              <ST3 as='label' htmlFor='classImgs'>
                썸네일 업로드
              </ST3>
              <StFilePicker>
                <StLabelBox className='input-file-button' htmlFor='classImgs'>
                  <StLabelText>파일 선택</StLabelText>
                </StLabelBox>
                <StFileInput
                  type='text'
                  value={imgInfo}
                  onChange={() => console.log("change")}
                />
                <input
                  type='file'
                  style={{ display: "none" }}
                  accept='image/jpg, image/png, image/jpeg'
                  id='classImgs'
                  placeholder='이미지 파일 선택'
                  {...register("classImgs", {
                    required:
                      "신규 클래스 생성을 위해서 썸네일을 입력해주세요.",
                    onChange: (e) => changeImgHandler(e),
                  })}
                />
              </StFilePicker>
              {errors.classImgs ? <ET1>{errors.classImgs.message}</ET1> : null}
            </StFilePart>
            <StImgPart>
              {!showImg ? (
                <StImgGuide>
                  <StGuideText>미리보기</StGuideText>
                  <StHelperText>썸네일 이미지 최대 20MB</StHelperText>
                </StImgGuide>
              ) : null}
              {showImg ? (
                <>
                  <StImg src={imgUrl[0]} alt='img' />
                  {/* <X onClick={() => console.log("clicked")} /> */}
                </>
              ) : null}
            </StImgPart>
            <Button
              type='submit'
              content='클래스 생성하기'
              page='modal'
              func='create'
            />
          </form>
        </StLayout>
      </Modal>
    </>
  );
};

export default CreateModal;

const StLayout = styled.div`
  padding: 27px 61px;
`;

const StInput = styled.input`
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 6px;
  width: 285px;
  margin-top: 10px;
  padding: 11px 48px 11px 14px;
`;

const StSearchBar = styled(StInput)`
  background-image: url("https://raw.githubusercontent.com/Techie006/FE/21142e4530a912b50a49fc500325a0d78f2fd272/src/assets/icons/search.svg");
  background-position: 250px center;
  background-repeat: no-repeat;
`;

const StNamePart = styled.div`
  margin-top: 0px;
`;

const StRecipePart = styled.div`
  margin-top: 26px;
`;

const StFilePart = styled.div`
  margin-top: 26px;
  margin-bottom: 26px;
`;

const StImgPart = styled.div`
  margin-bottom: 40px;
`;

const StFilePicker = styled.div`
  display: flex;
  margin: 10px 0px 0px 0px;
`;

const StLabelBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #d3d3d3;
  border-radius: 6px;
  width: 91px;
  height: 40px;
`;

const StLabelText = styled(T4)`
  color: #5b5b5b;
`;

const StFileInput = styled(StInput)`
  margin-top: 0px;
  margin-left: 8px;
`;

const StImgGuide = styled.div`
  width: 285px;
  height: 146px;
  background: #efefef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StGuideText = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  color: #a5a5a5;
`;

const StHelperText = styled(StGuideText)`
  font-weight: 500;
`;

const StImg = styled.img`
  width: 285px;
  height: 146px;
  object-fit: cover; // 가로 세로 비율 유지하며 꽉 참
`;
