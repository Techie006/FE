import { useNavigate } from "react-router-dom";

const ChatTest = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const classId = e.target.querySelector("input").value;
    navigate(`/class/${classId}`);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='class id' />
        <button type='submit'>제출</button>
      </form>
    </>
  );
};

export default ChatTest;
