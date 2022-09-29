import { useState } from "react";
import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";
import ClassesHeader from "./ClassesHeader";
import Classes from "./Classes";
import CreateModal from "./modal/CreateModal";

const ClassesFrame = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 클래스 생성 모달을 여닫는 함수
  const clickHandler = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <GridTemplate height='auto'>
      <StHeader>
        <ClassesHeader onClick={clickHandler} />
      </StHeader>
      <Classes />
      {modalOpen ? <CreateModal onClick={clickHandler} /> : null}
    </GridTemplate>
  );
};

export default ClassesFrame;

const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  padding: 16px 18px;
`;

const StHeader = styled.div`
  grid-column: 1 / span 12;
  height: auto;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StClassesPart = styled(StGrid)``;
