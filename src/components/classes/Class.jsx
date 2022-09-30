import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { enterClass } from "../../modules/redux/cookingClass";
import { T7, ST1 } from "../../styles/Text";
import Ingridients from "../../elements/molecules/Ingredients";

const Class = ({
  class_id,
  class_img,
  class_name,
  redis_class_id,
  ingredients,
  session_id,
  viewer_nums,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 클래스 입장 절차 거쳐야 함
  const clickHandler = async () => {
    // TODO loader 클래스 입장중입니다 알람 띄우기
    // 클래스 입장 요청
    const resp = await apis.enter_class({ class_id });

    const {
      content,
      status: { code },
    } = resp.data;

    if (code === 400) {
      window.alert("이미 정원이 다 찬 방입니다. 입장이 불가해요.");
      return;
    }

    const { session_id, token, full_token, chats } = content;
    dispatch(enterClass({ session_id, token, full_token, chats }));

    navigate(`/class/${class_id}/${redis_class_id}/sub`);
  };

  return (
    <StClassSection onClick={clickHandler}>
      <StImgPart>
        <StViewerBox>
          <StViewerText>{`${viewer_nums}명 시청중`}</StViewerText>
        </StViewerBox>
        <StImg src={class_img} alt='thumbnail' />
      </StImgPart>
      <StInfoPart>
        <Ingridients contents={ingredients} />
        <StClassTitle>{class_name}</StClassTitle>
      </StInfoPart>
    </StClassSection>
  );
};

export default Class;

// TOOD 반응형으로 바꾸기
const StClassSection = styled.div`
  /* width: 405px; */
  grid-column: span 4;

  background: #ffffff;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column-end: span 4;
  }
`;

const StImgPart = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const StViewerBox = styled.div`
  position: absolute;
  left: 10px;
  top: 13px;
  padding: 3px 4px;
  background: #ececec;
  opacity: 0.5;
  border-radius: 2px;
  z-index: 10;
`;

const StViewerText = styled(T7)`
  color: #ffffff;
  opacity: 1;
  z-index: 20;
`;

const StImg = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  top: 50%;
  left: 50%;
`;

const StInfoPart = styled.div`
  display: flex;
  padding: 18px;
  flex-direction: column;
`;

const StClassTitle = styled(ST1)`
  margin-top: 10px;
  line-height: 26px;
`;
