import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import Button from "../../elements/atoms/Button";

const CreateChat = (props) => {
  const stomp = useSelector((state) => state.cookingClass.stomp);

  const { stompClient, getHeader, createData, sendEvent } = stomp;

  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  const submitHandler = ({ message }) => {
    sendEvent("MESSAGE", message);
    reset();
  };

  return (
    <>
      <form>
        <input
          type='text'
          placeholder='chat message'
          {...register("message", { required: true })}
        />
        <Button
          isIcon={true}
          icon={faPaperPlane}
          onClick={handleSubmit(submitHandler)}
        />
      </form>
    </>
  );
};

export default CreateChat;
