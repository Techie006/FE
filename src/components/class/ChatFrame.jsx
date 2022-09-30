import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useRef, useCallback, useEffect } from "react";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import styled from "styled-components";

import { ST2, Text } from "../../styles/Text";
import Chats from "./Chats";
import CreateChat from "./CreateChat";
import ChatHeader from "./ChatHeader";

// TODO change v4 -> v5
const ChatFrame = (props) => {
  const { redis_class_id } = useParams();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);

  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});
  const subscription = useRef({});

  // webSocket 통신을 위한 헤더 생성
  const getHeader = useCallback(() => {
    if (isLogin)
      return {
        Authorization: localStorage.getItem("Authorization"),
      };
    else return {};
  }, [isLogin]);

  // webSocket 통신을 위한 request body 생성
  const createData = useCallback(
    (eventType, message = "") => ({
      type: eventType,
      redis_class_id: redis_class_id,
      member_id: userInfo.member_id,
      nickname: userInfo.username,
      profile_img: userInfo.profile_img,
      message: message,
      viewer_num: 0,
    }),
    [redis_class_id, userInfo]
  );

  // 발생 이벤트에 따라 webSocket 통신 송신 요청 생성
  const sendEvent = useCallback(
    (event, message) => {
      stompClient.current.send(
        `/api/pub/chat`,
        JSON.stringify(createData(event, message)),
        getHeader()
      );
    },
    [getHeader, createData]
  );

  // 발생 이벤트에 따라 webSocket 통신 수신
  const receiveEvent = useCallback((frame) => {
    const resp = JSON.parse(frame.body);
    const { type } = resp;
    switch (type) {
      case "ENTER":
        console.log("enter", resp);
        return;
      case "MESSAGE":
        console.log("message", resp);
        return;
      case "LEAVE":
        console.log("leave", resp);
        return;
      default:
        return;
    }
  }, []);

  const connectSocket = useCallback(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("http://3.38.214.79/ws");
    stompClient.current = webstomp.over(sock);

    // 2. webSocket 연결
    stompClient.current.connect(getHeader(), () => {
      sendEvent("ENTER");

      subscription.current = stompClient.current.subscribe(
        `/api/sub/chat/${redis_class_id}`,
        (frame) => receiveEvent(frame),
        getHeader()
      );
    });
  }, [sendEvent, redis_class_id, receiveEvent, getHeader]);

  const disconnectSocket = useCallback(() => {
    // 1. webSocket 연결 해지 전 Leave 이벤트 전달
    stompClient.current.send(
      `/api/pub/chat`,
      JSON.stringify(createData("LEAVE")),
      getHeader()
    );

    // 2. webSocket 연결 해지
    subscription.current.unsubscribe();
    stompClient.current.disconnect();
  }, [createData, getHeader]);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket]);

  return (
    <>
      <ChatHeader />
      <StChatsPart>
        <Chats />
      </StChatsPart>
      <StCreatePart>
        <CreateChat stompClient={stompClient} />
      </StCreatePart>
    </>
  );
};

export default ChatFrame;

const StChatsPart = styled.div`
  height: 439px;
  overflow-y: scroll;
  background-color: #eeeaea;
`;

const StCreatePart = styled.div`
  border-top: 1px solid #ececec;
  background: #fafafa;
  border-radius: 0px 0px 8px 8px;
`;
