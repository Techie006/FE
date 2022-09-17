import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { faX } from "@fortawesome/free-solid-svg-icons";

import {
  closeModal,
  __createDiet,
  __updateDiet,
} from "../../modules/redux/calendar";
import Modal from "../common/Modal";
import {
  ModalTitle,
  ModalAccentText,
  ModalSmallText,
} from "../../elements/texts/modalTexts";
import SmallIconButton from "../../elements/buttons/SmallIconButton";
import ModalSmallButton from "../../elements/buttons/ModalSmallButton";

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

  const clickHanlder = () => {
    dispatch(closeModal());
  };

  const submitHandler = ({ recipe, time, date }) => {
    if (modalType === "create") {
      dispatch(__createDiet({ recipe_name: recipe, category: time, date }));
    }

    if (modalType === "update") {
      dispatch(__updateDiet({ id, recipe_name: recipe, category: time, date }));
    }

    clickHanlder();
  };

  let disable = errors.recipe || errors.time || errors.date;

  return (
    <Modal>
      <ModalTitle>레시피 기록하기</ModalTitle>
      <SmallIconButton icon={faX} onClick={clickHanlder} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <ModalAccentText>어떤 요리를 하실건가요?</ModalAccentText>
        <input
          type='text'
          placeholder='레시피명을 입력하세요'
          {...register("recipe", {
            required: "레시피명을 입력해주셔야 식단 입력이 가능해요.",
          })}
        />
        <ModalSmallText>
          {errors.recipe ? errors.recipe.message : ""}
        </ModalSmallText>
        <fieldset>
          <ModalAccentText>언제 드실지 알려주세요!</ModalAccentText>
          <div>
            <input
              type='radio'
              id='아침'
              value='아침'
              {...register("time", {
                required: "시간을 알려주셔야 식단 입력이 가능해요.",
              })}
            />
            <label for='아침'>아침</label>
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
            <label for='점심'>점심</label>
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
            <label for='저녁'>저녁</label>
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
            <label for='간식'>간식</label>
          </div>
          <ModalSmallText>
            {errors.time ? errors.time.message : ""}
          </ModalSmallText>
        </fieldset>
        <ModalAccentText>드실 날짜를 정해주세요!</ModalAccentText>
        <input
          type='date'
          id='due'
          {...register("date", {
            required: "드실 날짜를 입력해주셔야 식단 입력이 가능해요.",
          })}
        />
        <ModalSmallText>
          {errors.date ? errors.date.message : ""}
        </ModalSmallText>
        <ModalSmallButton
          type='submit'
          content='식단 저장하기'
          disabled={disable}
        />
      </form>
    </Modal>
  );
};

export default DietModal;
