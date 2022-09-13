import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import SmallIconButton from "../../elements/buttons/SmallIconButton";

const Toolbar = ({ year, month, onClick }) => {
  const BUTTONS = ["Left", "Right"];
  return (
    <StWrapper>
      <SmallIconButton
        icon={faArrowCircleLeft}
        onClick={() => onClick(BUTTONS[0])}
      />
      <StYYMM>{`${year}년 ${month}월`}</StYYMM>
      <SmallIconButton
        icon={faArrowCircleRight}
        onClick={() => onClick(BUTTONS[1])}
      />
    </StWrapper>
  );
};

export default Toolbar;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
  align-items: center;
`;

const StYYMM = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin: 0px 12px;
  margin-bottom: 4px;
`;
