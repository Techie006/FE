import { useForm } from "react-hook-form";
import styled from "styled-components";

const CreateChat = ({ stompClient, getHeader, createData, sendEvent }) => {
  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  const submitHandler = ({ message }) => {
    sendEvent("MESSAGE", message);
    reset();
  };

  return (
    <>
      <StInputBox>
        <form>
          <input
            type='text'
            placeholder='메시지 작성'
            {...register("message", { required: true })}
          />
          {/* <Button
          isIcon={true}
          icon={faPaperPlane}
          onClick={handleSubmit(submitHandler)}
        /> */}
        </form>
      </StInputBox>
    </>
  );
};

export default CreateChat;

const StInputBox = styled.div`
  position: relative;
  width: 60%;
  background: tomato;
  height: 40px;

  input {
    border: none;
    width: 60%;
    background: black;
    margin: 14px;
    color: white;
    padding: 11px 43px 12px 8px;
    box-sizing: content-box;
  }
`;
