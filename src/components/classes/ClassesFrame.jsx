import { useDispatch } from "react-redux";
import { useState } from "react";
import styled from "styled-components";

import { resetSelected } from "../../modules/redux/cookingClass";
import GridTemplate from "../../elements/templates/GridTemplate";
import ClassesHeader from "./ClassesHeader";
import Classes from "./Classes";
import CreateModal from "./modal/CreateModal";

const ClassesFrame = () => {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  // 클래스 생성 모달을 여닫는 함수
  const clickHandler = () => {
    setModalOpen((prev) => !prev);
    dispatch(resetSelected());
  };

  return (
    <GridTemplate height='114px'>
      <StHeader>
        <ClassesHeader onClick={clickHandler} />
      </StHeader>
      <Classes />
      {modalOpen ? <CreateModal onClick={clickHandler} /> : null}
    </GridTemplate>
  );
};

export default ClassesFrame;

const StHeader = styled.div`
  grid-column: 1 / span 12;
  height: 114px;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
