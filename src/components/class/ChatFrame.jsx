import styled from "styled-components";

import WebSocket from "./WebSocket";
import { T3, Text } from "../../styles/Text";
import Chats from "./Chats";
import CreateChat from "./CreateChat";

// TODO change v4 -> v5
const ChatFrame = (props) => {
  return (
    <>
      <StHeader>
        <T3>실시간 채팅</T3>
        <Text>시청자 수 : </Text>
      </StHeader>
      <main>
        <WebSocket />
        <StChatsPart>
          <Chats />
        </StChatsPart>
        <StCreatePart>
          <CreateChat />
        </StCreatePart>
      </main>
    </>
  );
};

export default ChatFrame;

const StHeader = styled.div`
  padding: 18px 18px;
`;

const StChatsPart = styled.div`
  height: 300px;
  overflow-y: scroll;
  background-color: #eeeaea;
`;

const StCreatePart = styled.div`
  border-top: 1px solid #ececec;
  background: ${(props) => props.theme.section.box.background};
`;
