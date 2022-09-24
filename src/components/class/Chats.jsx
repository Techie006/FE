import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";

import Chat from "./Chat";

const Chats = () => {
  const prevChats = useSelector((state) => state.cookingClass.prevChats);

  const [chats, setChats] = useState(prevChats);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const message = e.target.querySelector("input").value;
  //   sendEvent("MESSAGE", message);
  // };

  useEffect(() => {
    setChats(prevChats);
  }, [prevChats]);

  const chatList = chats.map(({ redis_chat_id, ...props }) => (
    <Chat key={redis_chat_id} {...props} />
  ));

  return (
    <>
      <StWrapper>{chatList}</StWrapper>
      {/* <StCretePart>
        <form onSubmit={submitHandler}>
          <input type='text' placeholder='chat message' />
          <button type='submit'>제출</button>
        </form>
      </StCretePart> */}
    </>
  );
};

export default Chats;

const StWrapper = styled.div`
  height: 300px;
  overflow-y: scroll;
  background-color: #eeeaea;
`;

const StCreatePart = styled.div``;
