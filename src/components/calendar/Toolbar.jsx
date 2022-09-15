import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import SmallIconButton from "../../elements/buttons/SmallIconButton";
import SmallButton from "../../elements/buttons/SmallButton";

const Toolbar = (props) => {
  const { date } = props;

  const navigate = (action) => {
    props.onNavigate(action);
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
        {/* TODO change to  */}
        <SmallButton
          type='button'
          content='기록하기'
          onClick={navigate.bind(null, "TODAY")}
        />
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
