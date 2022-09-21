import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";

// TODO change v4 -> v5

const ChatFrame = (props) => {
  const prevChats = useSelector((state) => state.cookingClass.prevChats);
  const { redisClassId } = useParams();

  const [chats, setChats] = useState(prevChats);
  console.log(chats);
  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});

  useEffect(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("http://3.36.56.125/ws");
    stompClient.current = webstomp.over(sock);
    let subscription;

    // 2. webSocket 연결
    stompClient.current.connect(
      { Authorization: localStorage.getItem("Authorization") },
      () => {
        console.log("연결 완료");
        const data = {
          id: "0",
          type: "ENTER",
          redis_class_id: redisClassId,
          // room_id: redisClassId,
          member_id: 1,
          nickname: "erica",
          profile_img:
            "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
          message: "first check!",
          viewer_num: 0,
        };

        stompClient.current.send(`/api/pub/chat`, JSON.stringify(data), {
          Authorization: localStorage.getItem("Authorization"),
        });

        subscription = stompClient.current.subscribe(
          `/api/sub/chat/${redisClassId}`,
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
          { Authorization: localStorage.getItem("Authorization") }
        );
      }
    );

    // 3. webSocket 연결 해지
    return () => {
      const data = {
        type: "MESSGAE",
        viewer_num: 0,
        redis_class_id: redisClassId,
        // room_id: redisClassId,
        member_id: 1,
        nickname: "erica",
        profile_img:
          "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
        message: "first leave!",
      };
      stompClient.current.send(`/api/pub/chat`, JSON.stringify(data), {
        Authorization: localStorage.getItem("Authorization"),
      });

      subscription.current.unsubscribe();
      stompClient.current.disconnect();
    };
  }, [redisClassId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    const data = {
      type: "MESSAGE",
      viewer_num: 0,
      redis_class_id: redisClassId,
      // room_id: redisClassId,
      member_id: 1,
      nickname: "erica",
      profile_img:
        "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
      message: message,
    };
    console.log(data);
    stompClient.current.send(`/api/pub/chat`, JSON.stringify(data), {
      Authorization: localStorage.getItem("Authorization"),
    });
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

export default ChatFrame;
