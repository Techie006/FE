import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { apis } from "../../../shared/axios";
import { openModal, createdClass } from "../../../modules/redux/cookingClass";
import Modal from "../../../elements/templates/Modal";
import { ST3, ET1, T4 } from "../../../styles/Text";
// import { ReactComponent as X } from "../../../assets/icons/circleX.svg";
import Button from "../../../elements/atoms/Button";
import SearchModal from "../../../elements/organisms/SearchModal";

// TODO 이미지 삭제 X 버튼 위치 디자인 협의 필요
const CreateModal = ({ onClick }) => {
  const modalOpen = useSelector((state) => state.cookingClass.modalOpen);
  const selectedRecipe = useSelector(
    (state) => state.cookingClass.selectedRecipe
  );
  const dispatch = useDispatch();

  const [showImg, setShowImg] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const [imgInfo, setImgInfo] = useState("선택된 사진이 없어요.");

  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    mode: "onChange",
  });

  // 사용자가 모달창 각 인풋필드 클릭 시 동작
  const clickHandler = (e) => {
    // 사용자가 모달창의 검색창 포커스 시, SearchModal 엶
    dispatch(openModal());
  };

  // 모달 창 내부 이미지 미리보기 처리 함수
  // (향후 여러장 업로드로 바뀔 수 있으므로 확장성 있는 함수로 설계)
  const changeImgHandler = async (e) => {
    const files = e.target.files;

    const fileList = Array.from(files);

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
  const deleteHandler = () => {
    setImgUrl([]);
    setImgInfo("");
    setShowImg(false);
    resetField("classImgs");
  };

  // 클래스 생성
  const submitHandler = async ({ className, classImgs, recipe }) => {
    const resp = await apis.create_class({
      recipe_id: selectedRecipe.id,
      class_name: className,
      files: classImgs,
    });

    const {
      content,
      status: { code },
    } = resp.data;

    if (code === 400) {
      errors.classImg = {
        message: "썸네일 크기는 20MB를 넘을 수 없습니다.",
      };
      return;
    }

    const { class_id, redis_class_id, session_id, full_token, token } = content;

    // session_id, token 정보 저장
    dispatch(createdClass({ session_id, token, full_token }));

    navigate(`/class/${class_id}/${redis_class_id}/pub`);
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
                onClick={clickHandler}
                onChange={clickHandler}
                value={selectedRecipe.recipe_name || ""}
                {...register("recipe", {
                  required: "신규 클래스 생성을 위해서 레시피를 입력해주세요.",
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
                <StFileInput type='text' value={imgInfo} onChange={() => {}} />
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
                  {/* <X onClick={deleteHandler} /> */}
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
      {modalOpen ? <SearchModal pageFrom='class' depth={2} /> : null}
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
