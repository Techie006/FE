import { useSelector } from "react-redux";

const CreateChat = (props) => {
  const stomp = useSelector((state) => state.cookingClass.stomp);

  const { stompClient, getHeader, createData, sendEvent } = stomp;

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    sendEvent("MESSAGE", message);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='chat message' />
        <button type='submit'>제출</button>
      </form>
    </>
  );
};

export default CreateChat;
