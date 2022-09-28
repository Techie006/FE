import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Calendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";
import {
  closeDietModal,
  openDatePicker,
  openSearchModal,
  __createDiet,
  __updateDiet,
} from "../../../modules/redux/calendar";
import Modal from "../../../elements/templates/Modal";
import { ST3, ET1 } from "../../../styles/Text";
import Category from "../../../elements/molecules/Category";
import Button from "../../../elements/atoms/Button";

const DietModal = (props) => {
  // 식단 모달의 유형 create/ update 가져옴
  const modalType = useSelector((state) => state.calendar.modalType);

  // 식단 생성하기 모달인 경우, 캘린더에서 선택된 날짜를 가져옴
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  // 식단 변경하기 모달인 경우, 주간 식단들 중 선택된 식단을 가져옴
  const selectedDiet = useSelector((state) => state.calendar.selectedDiet);

  // 식단 작성을 위해 검색 모달에서 선택한 레시피 정보를 가져옴
  const selectedRecipe = useSelector((state) => state.calendar.selectedRecipe);

  const dispatch = useDispatch();

  const [time, setTime] = useState(selectedDiet.time);
  const [errors, setErrors] = useState({});

  // 사용자가 식단 모달창 닫음
  const closeHandler = () => {
    dispatch(closeDietModal());
  };

  // 사용자가 모달창 각 인풋필드 포커스 시 동작
  const focusHandler = (e) => {
    const focused = e.target.id;

    // 사용자가 특정 인풋필드 내용 변경 시도 시 기존 에러 삭제
    setErrors((prev) => {
      delete prev[focused];
      return prev;
    });

    // 사용자가 모달창의 검색창 포커스 시, SearchModal 엶
    if (focused === "recipe") {
      dispatch(openSearchModal());
      return;
    }
    // 사용자가 모달창의 날짜창 포커스 시, Calendar 엶
    if (focused === "due") {
      dispatch(openDatePicker());
      return;
    }
  };

  // 사용자가 모달창에서 선택한 time을 상태값에 저장
  const clickHandler = (e) => {
    const value = e.target.innerText;

    // 이미 선택된 시간대라면 중복 처리하지 않음
    if (time === value) {
      return;
    }

    // 기존 에러 삭제
    setErrors((prev) => {
      delete prev.time;
      return prev;
    });

    // 식단 시간대를 변경
    setTime(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // form에 빈 값 오는 경우 에러처리
    let error = {};

    if (JSON.stringify(selectedRecipe) === `{}`) {
      error.recipe = {
        hasError: true,
        message: "레시피를 입력해주세야해요.",
      };
    }
    if (time === undefined) {
      error.time = {
        hasError: true,
        message: "시간대를 지정해주세야해요.",
      };
    }
    if (selectedDate === undefined) {
      error.due = {
        hasError: true,
        message: "날짜를 입력해주세야해요.",
      };
    }

    if (JSON.stringify(error) !== "{}") {
      setErrors(error);
      return;
    }

    // 모든 입력값 받은 경우, 식단 기록하기 모달 처리
    if (modalType === "create") {
      console.log("create diet called");
      dispatch(
        __createDiet({
          recipe_id: selectedRecipe.id,
          category: time,
          date: selectedDate,
        })
      );
    }

    // 모든 입력값 받은 경우, 식단 변경하기 모달 처리
    if (modalType === "update") {
      console.log("update diet called");
      dispatch(
        __updateDiet({
          recipe_id: selectedRecipe.id,
          category: time,
          date: selectedDate,
        })
      );
    }

    closeHandler();
  };

  return (
    <Modal header='식단 기록하기' onClick={closeHandler} depth={1}>
      <StForm onSubmit={submitHandler}>
        <StRecipePart>
          <ST3>어떤 요리를 하실건가요?</ST3>
          <StSearchBar
            type='text'
            placeholder='레시피명 검색'
            id='recipe'
            onFocus={focusHandler}
            onChange={focusHandler}
            value={selectedRecipe?.recipe_name || ""}
          />
          {errors.recipe?.hasError ? <ET1>{errors.recipe.message}</ET1> : null}
        </StRecipePart>
        <StTimePart>
          <ST3>언제 드실지 정해볼까요?</ST3>
          <Category
            padding='10px 0px 0px 0px'
            contents={["아침", "점심", "저녁", "간식"]}
            onClick={clickHandler}
            page='modal'
            func='time'
            selectedCategory={time}
          />
          {errors.time?.hasError ? <ET1>{errors.time.message}</ET1> : null}
        </StTimePart>
        <StDatePart>
          <ST3>드실 날짜를 정해볼까요?</ST3>
          <StCalendarBar
            type='text'
            placeholder='날짜 입력'
            id='due'
            value={selectedDate || ""}
            onFocus={focusHandler}
            onChange={focusHandler}
          />
          {errors.due?.hasError ? <ET1>{errors.due.message}</ET1> : null}
        </StDatePart>
        <Button
          type='submit'
          content='기록하기'
          page='modal'
          func='create'
          marginTop={"30px"}
          onClick={submitHandler}
        />
      </StForm>
    </Modal>
  );
};

export default DietModal;

const StForm = styled.div`
  padding: 27px 61px;
`;

const StSearchBar = styled.input`
  background: #fafafa;
  border: 0.6px solid #dadada;
  border-radius: 6px;
  width: 285px;
  margin-top: 10px;
  padding: 11px 48px 11px 14px;
  background-image: url("https://raw.githubusercontent.com/Techie006/FE/21142e4530a912b50a49fc500325a0d78f2fd272/src/assets/icons/search.svg");
  background-position: 250px center;
  background-repeat: no-repeat;
`;

const StCalendarBar = styled(StSearchBar)`
  background-image: url("https://user-images.githubusercontent.com/48196721/192671343-31990b4f-464c-4534-80d1-9589dfe6df28.svg");
`;

const StRecipePart = styled.div`
  margin-top: 0px;
`;

const StTimePart = styled.div`
  margin-top: 26px;
`;

const StDatePart = styled.div`
  margin-top: 26px;
`;
