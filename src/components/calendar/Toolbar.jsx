import { useDispatch } from "react-redux";
import { openModal } from "../../modules/redux/calendar";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import SmallIconButton from "../../elements/buttons/SmallIconButton";
import SmallButton from "../../elements/buttons/SmallButton";

const Toolbar = (props) => {
  const dispatch = useDispatch();

  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
  };

  const clickHandler = () => {
    dispatch(openModal({ diet: {}, type: "create" }));
  };

  return (
    <StWrapper>
      <StNavigator>
        <SmallIconButton
          icon={faArrowCircleLeft}
          onClick={navigate.bind(null, "PREV")}
        />
        <StYYMM>{`${date.getFullYear()}년 ${date.getMonth() + 1}월`}</StYYMM>
        <SmallIconButton
          icon={faArrowCircleRight}
          onClick={navigate.bind(null, "NEXT")}
        />
      </StNavigator>
      <StButtons>
        <SmallButton
          type='button'
          content='이번달'
          onClick={navigate.bind(null, "TODAY")}
        />
        <SmallButton type='button' content='기록하기' onClick={clickHandler} />
      </StButtons>
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
  gap: 10px;
`;

const StYYMM = styled.div`
  font-size: 15px;
`;

const StButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
