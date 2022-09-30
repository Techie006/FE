import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Notice from "./Notice";
import Chat from "./Chat";

const Chats = () => {
  const prevChats = useSelector((state) => state.cookingClass.prevChats);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    setChats(prevChats);
  }, [prevChats]);

  const chatList = chats.map(({ redis_chat_id, notice, ...props }) => {
    if (notice) {
      return <Notice key={redis_chat_id} {...props} />;
    } else {
      return <Chat key={redis_chat_id} {...props} />;
    }
  });

  return <>{chatList}</>;
};

export default Chats;
