import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import IconBox from "../../../elements/atoms/IconBox";
import { ReactComponent as SendMsg } from "../../../assets/icons/sendMsg.svg";

const CreateChat = ({ stompClient }) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const { redis_class_id } = useParams();

  // webSocket 통신을 위한 헤더 생성
  const getHeader = () => {
    if (isLogin)
      return {
        Authorization: localStorage.getItem("Authorization"),
      };
    else return {};
  };

  // webSocket 통신을 위한 request body 생성
  const createData = (eventType, message = "") => ({
    type: eventType,
    redis_class_id: redis_class_id,
    member_id: userInfo.member_id,
    nickname: userInfo.username,
    profile_img: userInfo.profile_img,
    message: message,
    viewer_num: 0,
  });

  // 발생 이벤트에 따라 webSocket 통신 송신 요청 생성
  const sendEvent = (event, message) => {
    stompClient.current.send(
      `/api/pub/chat`,
      JSON.stringify(createData(event, message)),
      getHeader()
    );
  };

  const { register, handleSubmit, reset } = useForm({ mode: "onChange" });

  const submitHandler = ({ message }) => {
    sendEvent("MESSAGE", message);
    reset();
  };

  return (
    <>
      <StInputBox>
        <form onSubmit={handleSubmit(submitHandler)}>
          <StInput
            type='text'
            placeholder='메시지 작성...'
            {...register("message", { required: true })}
          />
          <StButton>
            <IconBox
              page='class'
              func='send'
              onClick={handleSubmit(submitHandler)}
              isBox={false}
            >
              <SendMsg fill='#A5A5A5' />
            </IconBox>
          </StButton>
        </form>
      </StInputBox>
    </>
  );
};

export default CreateChat;

const StInputBox = styled.div`
  position: relative;
  margin: 14px;
  height: 40px;
`;

const StInput = styled.input`
  border: none;
  width: 100%;
  padding: 11px 43px 12px 8px;
`;

const StButton = styled.div`
  position: absolute;
  top: 10px;
  left: 85%;
`;
