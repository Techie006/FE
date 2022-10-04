import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef, useCallback, useEffect } from "react";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import styled from "styled-components";

import {
  enterEvent,
  messageEvent,
  leaveEvent,
} from "../../modules/redux/cookingClass";
import Chats from "./chat/Chats";
import CreateChat from "./chat/CreateChat";
import ChatHeader from "./chat/ChatHeader";

// TODO change v4 -> v5
const ChatFrame = (props) => {
  const { redis_class_id } = useParams();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();

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
  const receiveEvent = useCallback(
    (frame) => {
      const resp = JSON.parse(frame.body);
      const { type } = resp;
      switch (type) {
        case "ENTER":
          dispatch(enterEvent({ chat: resp }));
          return;
        case "MESSAGE":
          dispatch(messageEvent({ chat: resp }));
          return;
        case "LEAVE":
          dispatch(leaveEvent({ chat: resp }));
          return;

        default:
          return;
      }
    },
    [dispatch]
  );

  const connectSocket = useCallback(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("https://magorosc.shop/ws");
    stompClient.current = webstomp.over(sock);

    // optional ) stomp client debug mode OFF
    stompClient.debug = null;

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
    // 페이지 벗어나서 컴포넌트가 unmount 시 소켓에서 해제
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket]);

  // window.onbeforeunload = function () {
  //   stompClient.current.disconnect();
  // };

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
  padding: 10px 20px 0px 20px;
`;

const StCreatePart = styled.div`
  border-top: 1px solid #ececec;
  background: #fafafa;
  border-radius: 0px 0px 8px 8px;
`;
