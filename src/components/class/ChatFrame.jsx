import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useRef, useCallback, useEffect } from "react";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import styled from "styled-components";

// TODO change v4 -> v5

const ChatFrame = (props) => {
  const prevChats = useSelector((state) => state.cookingClass.prevChats);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { redisClassId } = useParams();

  const [chats, setChats] = useState(prevChats);

  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});
  const subscription = useRef({});

  const getHeader = useCallback(() => {
    if (isLogin)
      return {
        Authorization: localStorage.getItem("Authorization"),
      };
    else return {};
  }, [isLogin]);

  const createData = useCallback(
    (eventType, message = "") => ({
      type: eventType,
      redis_class_id: redisClassId,
      member_id: userInfo.member_id,
      nickname: userInfo.username,
      profile_img: userInfo.profile_img,
      message: message,
      viewer_num: 0,
    }),
    [redisClassId, userInfo]
  );

  const sendEvent = useCallback(
    (event, message) => {
      stompClient.current.send(
        `/pub/chat`,
        JSON.stringify(createData(event, message)),
        getHeader()
      );
    },
    [getHeader, createData]
  );

  const connectSocket = useCallback(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("http://3.36.56.125/ws");
    stompClient.current = webstomp.over(sock);

    // 2. webSocket 연결
    stompClient.current.connect(getHeader(), () => {
      sendEvent("ENTER");

      subscription.current = stompClient.current.subscribe(
        `/sub/chat/${redisClassId}`,
        (frame) => {
          console.log(frame);
          const resp = JSON.parse(frame.body);
          const { type } = resp;
          switch (type) {
            case "ENTER":
              console.log("enter");
              return;
            case "MESSAGE":
              console.log("message");
              return;
            case "LEAVE":
              console.log("leave");
              return;
            default:
              return;
          }
        },
        getHeader()
      );
    });
  }, [getHeader, sendEvent, redisClassId]);

  const disconnectSocket = useCallback(() => {
    // 1. webSocket 연결 해지 전 Leave 이벤트 전달
    stompClient.current.send(
      `/pub/chat`,
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

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    sendEvent("MESSAGE", message);
  };

  return (
    <StWrapper>
      <StSection>1</StSection>
      <StSection>2</StSection>
      <StSection>3</StSection>
      <StSection>4</StSection>
      <StSection>5</StSection>
      <StSection>6</StSection>
      <StSection>7</StSection>
      <StSection>8</StSection>
      <StSection>9</StSection>
      <StSection>10</StSection>
      <StSection>11</StSection>
      <StSection>12</StSection>
      {/* <form onSubmit={submitHandler}>
        <input type='text' placeholder='chat message' />
        <button type='submit'>제출</button>
      </form> */}
    </StWrapper>
  );
};

export default ChatFrame;

const StWrapper = styled.div`
  display: grid;
  grid-auto-rows: "621px";
  background: black;
  margin: 20px 84px;
  grid-template-columns: repeat(
    12,
    calc((100% - (2 * 84px) - (10 * 24px)) / 12)
  );
  grid-column-gap: 24px;
  /* grid-row-gap: 20px; */

  /* tablet */
  /* @media all and (max-width: 1024px) {
    margin: 20px 30px;
    grid-template-columns: repeat(12, calc((100%- 2 * 40px) / 12));
    grid-column-gap: 28px;
    grid-row-gap: 20px;
  } */

  /* mobile */
  /* @media all and (max-width: 600px) {
    padding: 16px 16px;
    grid-template-columns: repeat(1, 100%);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  } */
`;

const StSection = styled.div`
  padding: 18px 18px;
  background: ${(props) => props.theme.section.layout.background};
  background: tomato;
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;
