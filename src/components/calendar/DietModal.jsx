import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  closeDietModal,
  openSearchModal,
  __createDiet,
  __updateDiet,
} from "../../modules/redux/calendar";
import Modal from "../../elements/templates/Modal";
import { ST3, ET1 } from "../../styles/Text";
import Category from "../../elements/molecules/Category";

const DietModal = (props) => {
  const modalType = useSelector((state) => state.calendar.modalType);
  const selectedDiet = useSelector((state) => state.calendar.selectedDiet);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  const { id, recipe_id, recipe_name, time, day } = selectedDiet;

  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState(time);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues:
      modalType === "create"
        ? {
            // 캘린더 칸을 클릭한 경우 해당 칸의 일자를 기본값으로, 식단 추가하기 버튼을 클릭한 경우 오늘 일자를 기본값으로 제공
            date: selectedDate,
          }
        : {
            // 기존 식단을 수정하는 경우, 식단 정보들을 기본값으로 제공
            recipe: recipe_name,
            time: time,
            date: day,
          },
  });

  const closeHandler = () => {
    dispatch(closeDietModal());
  };

  const clickHandler = (e) => {
    const value = e.target.innerHTML;

    // 이미 선택된 시간대라면 중복 처리하지 않음
    if (selectedTime === value) {
      return;
    }

    // 식단 시간대를 변경
    setSelectedTime(value);
  };

  const focusHandler = () => {
    dispatch(openSearchModal());
  };

  const submitHandler = ({ recipe, time, date }) => {
    if (modalType === "create") {
      dispatch(__createDiet({ recipe_name: recipe, category: time, date }));
    }

    if (modalType === "update") {
      dispatch(__updateDiet({ id, recipe_name: recipe, category: time, date }));
    }

    closeHandler();
  };

  let disable = errors.recipe || errors.time || errors.date;

  return (
    <Modal header='식단 기록하기' onClick={closeHandler} depth={1}>
      <StForm onSubmit={handleSubmit(submitHandler)}>
        <ST3>어떤 요리를 하실건가요?</ST3>
        <StInput
          type='text'
          placeholder='레시피명 검색'
          {...register("recipe", {
            required: "레시피명을 입력해주셔야 식단 입력이 가능해요.",
          })}
          onFocus={focusHandler}
        />
        <ET1>{errors.recipe ? errors.recipe.message : ""}</ET1>
        <ST3>언제 드실지 정해볼까요?</ST3>
        <Category
          contents={["아침", "점심", "저녁", "간식"]}
          onClick={clickHandler}
          page='modal'
          func='time'
          selectedCategory={selectedTime}
        />
        <ST3>드실 날짜를 정해볼까요?</ST3>
        <input
          type='date'
          id='due'
          placeholder='날짜 입력'
          {...register("date", {
            required: "드실 날짜를 입력해주셔야 식단 입력이 가능해요.",
          })}
        />
        <ET1>{errors.date ? errors.date.message : ""}</ET1>
        {/* <ModalSmallButton
          type='submit'
          content='식단 저장하기'
          disabled={disable}
        /> */}
      </StForm>
    </Modal>
  );
};

export default DietModal;

const StForm = styled.div`
  padding: 27px 61px;
`;

const StInput = styled.input`
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 6px;
  width: 285px;
  padding: 11px 48px 11px 14px;
  background-image: url("https://raw.githubusercontent.com/Techie006/FE/21142e4530a912b50a49fc500325a0d78f2fd272/src/assets/icons/search.svg");
  background-position: 250px center;
  background-repeat: no-repeat;
`;

const StRadio = styled.input`
  appearance: none;
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 30px;
  padding: 10px 7px;
  width: 52px;
  height: 40px;
`;
