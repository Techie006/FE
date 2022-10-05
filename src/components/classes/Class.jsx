import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import { showAlert, showConfirm } from "../../shared/popups";
import { enterClass } from "../../modules/redux/cookingClass";
import { ST1 } from "../../styles/Text";
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
    showAlert(2000, "info", "선택하신 클래스에 입장하는 중입니다.");

    // 클래스 입장 요청
    const resp = await apis.enter_class({ class_id });

    const {
      content,
      status: { code },
    } = resp.data;

    // TODO code 바꿔달라 요청
    if (code === 400) {
      showConfirm(
        "선택하신 클래스는 정원이 다 찼으므로 입장 불가합니다.",
        "warning",
        false,
        "",
        "클래스 조회로 돌아가기"
      );
      return;
    }

    const { session_id, token, full_token, chats } = content;
    dispatch(enterClass({ session_id, token, full_token, chats }));

    navigate(`/class/${class_id}/${redis_class_id}/sub`);
  };

  return (
    <StClassSection onClick={clickHandler}>
      <StImgPart>
        <StViewer>{`${viewer_nums}명 시청중`}</StViewer>
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

const StClassSection = styled.div`
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
  position: relative;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StViewer = styled.div`
  position: absolute;
  left: 10px;
  top: 13px;
  padding: 3px 4px;
  background: #ff5c01;
  border-radius: 2px;
  z-index: 10;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  color: #ffffff;
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
