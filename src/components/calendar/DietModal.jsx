import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import {
  closeModal,
  __createDiet,
  __updateDiet,
} from "../../modules/redux/calendar";
import Modal from "../common/Modal";
import { ST3 } from "../../styles/Text";

const DietModal = (props) => {
  const modalType = useSelector((state) => state.calendar.modalType);
  const diet = useSelector((state) => state.calendar.selectedDiet);
  const { id, recipe_id, recipe_name, time, day } = diet;

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues:
      modalType === "create"
        ? {}
        : {
            recipe: recipe_name,
            time: time,
            date: day,
          },
  });

  const clickHandler = () => {
    dispatch(closeModal());
  };

  const submitHandler = ({ recipe, time, date }) => {
    if (modalType === "create") {
      dispatch(__createDiet({ recipe_name: recipe, category: time, date }));
    }

    if (modalType === "update") {
      dispatch(__updateDiet({ id, recipe_name: recipe, category: time, date }));
    }

    clickHandler();
  };

  let disable = errors.recipe || errors.time || errors.date;

  return (
    <Modal header='식단 기록하기' onClick={clickHandler}>
      <StForm onSubmit={handleSubmit(submitHandler)}>
        <ST3>어떤 요리를 하실건가요?</ST3>
        <StInput
          type='text'
          placeholder='레시피명 검색'
          {...register("recipe", {
            required: "레시피명을 입력해주셔야 식단 입력이 가능해요.",
          })}
        />
        <ST3>{errors.recipe ? errors.recipe.message : ""}</ST3>
        <fieldset>
          <ST3>언제 드실지 정해볼까요?</ST3>
          <div>
            <input
              type='radio'
              id='아침'
              value='아침'
              {...register("time", {
                required: "시간을 알려주셔야 식단 입력이 가능해요.",
              })}
            />
            <label htmlFor='아침'>아침</label>
          </div>
          <div>
            <input
              type='radio'
              id='점심'
              value='점심'
              {...register("time", {
                required: "시간을 알려주셔야 식단 입력이 가능해요.",
              })}
            />
            <label htmlFor='점심'>점심</label>
          </div>
          <div>
            <input
              type='radio'
              id='저녁'
              value='저녁'
              {...register("time", {
                required: "시간을 알려주셔야 식단 입력이 가능해요.",
              })}
            />
            <label htmlFor='저녁'>저녁</label>
          </div>
          <div>
            <input
              type='radio'
              id='간식'
              value='간식'
              {...register("time", {
                required: "시간을 알려주셔야 식단 입력이 가능해요.",
              })}
            />
            <label htmlFor='간식'>간식</label>
          </div>
          <ST3>{errors.time ? errors.time.message : ""}</ST3>
        </fieldset>
        <ST3>드실 날짜를 정해볼까요?</ST3>
        <input
          type='date'
          id='due'
          placeholder='날짜 입력'
          {...register("date", {
            required: "드실 날짜를 입력해주셔야 식단 입력이 가능해요.",
          })}
        />
        <ST3>{errors.date ? errors.date.message : ""}</ST3>
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
  padding: 11px 14px;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='25' viewBox='0 0 25 25' fill-rule='evenodd'><path d='M16.036 18.455l2.404-2.405 5.586 5.587-2.404 2.404zM8.5 2C12.1 2 15 4.9 15 8.5S12.1 15 8.5 15 2 12.1 2 8.5 4.9 2 8.5 2zm0-2C3.8 0 0 3.8 0 8.5S3.8 17 8.5 17 17 13.2 17 8.5 13.2 0 8.5 0zM15 16a1 1 0 1 1 2 0 1 1 0 1 1-2 0'></path></svg>");
  background-size: contain;
  background-repeat: no-repeat;
`;
