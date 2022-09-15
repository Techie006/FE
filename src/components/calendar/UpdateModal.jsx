import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { faX } from "@fortawesome/free-solid-svg-icons";

import Modal from "../common/Modal";
import SmallIconButton from "../../elements/buttons/SmallIconButton";
import { closeModal } from "../../modules/redux/calendar";
import SmallInput from "../../elements/inputs/SmallInput";

const UpdateModal = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const submitHandler = (data) => {
    console.log(data);
  };

  const clickHandler = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal>
        <SmallIconButton icon={faX} onClick={clickHandler} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label htmlFor='recipe'>레시피</label>
            <SmallInput
              type='text'
              id='recipe'
              {...register("recipe", {
                required: "레시피 이름을 반드시 입력해주세요.",
              })}
            />
            {errors.recipe ? <div>{errors.recipe.message}</div> : null}
          </div>
          <div>
            <label htmlFor='category'>식사 유형</label>
            <input type='radio' id='breakfast' {...register("breakfast")} />
            <input type='radio' id='lunch' {...register("lunch")} />
            <input type='radio' id='dinner' {...register("dinner")} />
            <input type='radio' id='snack' {...register("snack")} />
          </div>
          <div>
            <label htmlFor='date'>예정 날짜</label>
            <SmallInput
              type='text'
              id='date'
              {...register("date", {
                required: "예정 날짜를 반드시 입력해주세요.",
              })}
            />
            {errors.date ? <div>{errors.date.message}</div> : null}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateModal;
