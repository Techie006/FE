import { useDispatch } from "react-redux";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrowRight.svg";
import { ReactComponent as Create } from "../../../assets/icons/create.svg";
import styled from "styled-components";

import { openModal } from "../../../modules/redux/calendar";
import IconBox from "../../../elements/atoms/IconBox";
import { BT2 } from "../../../styles/Text";
import Button from "../../../elements/atoms/Button";

const Toolbar = (props) => {
  const dispatch = useDispatch();

  const { date } = props;

  // react-big-calendar 기본 제공 기능 바인딩
  const navigate = (action) => {
    props.onNavigate(action);
  };

  // 캘린더 각 칸 클릭 시 해당 날짜에 신규 식단 추가 가능
  const clickHandler = () => {
    const date = new Date().toISOString().slice(0, 10);
    dispatch(openModal({ diet: {}, type: "create", date }));
  };

  return (
    <StWrapper>
      <StNavigator>
        <IconBox
          isCircle={true}
          page='calendar'
          func='prev'
          onClick={navigate.bind(null, "PREV")}
        >
          <ArrowLeft fill='#656565' />
        </IconBox>
        <BT2>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</BT2>
        <IconBox
          isCircle={true}
          page='calendar'
          func='next'
          onClick={navigate.bind(null, "NEXT")}
        >
          <ArrowRight fill='#656565' />
        </IconBox>
        <Button
          type='button'
          content='이번달 보기'
          page='calendar'
          func='view'
          onClick={navigate.bind(null, "TODAY")}
        />
      </StNavigator>
      <IconBox page='calendar' func='create' onClick={clickHandler}>
        <Create fill='#5B5B5B' />
      </IconBox>
    </StWrapper>
  );
};

export default Toolbar;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

const StNavigator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
`;
