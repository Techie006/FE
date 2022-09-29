import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { T7 } from "../../styles/Text";

const Class = ({
  class_id,
  class_img,
  class_name,
  redis_class_id,
  session_id,
  viewer_nums,
}) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/class/${class_id}/${redis_class_id}`);
  };

  return (
    <StLayout onClick={clickHandler}>
      <StImgPart>
        <StViewerBox>
          <StViewerText>{`${viewer_nums}명 시청중`}</StViewerText>
        </StViewerBox>
        <StImg src={class_img} alt='thumbnail' />
      </StImgPart>
      <div>{class_name}</div>
    </StLayout>
  );
};

export default Class;

// TOOD 반응형으로 바꾸기
const StLayout = styled.div`
  width: 405px;
  height: 331px;
  background: #ffffff;
  box-shadow: 0px 3px 13px 1px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const StImgPart = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 405px;
  height: 212px;
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
