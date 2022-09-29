import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { __getClassInfo } from "../../modules/redux/cookingClass";
import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";
import ChatFrame from "./ChatFrame";
// import VideoFrame from "./VideoFrame";

const ClassFrame = () => {
  const { classId, redisClassId, role } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getClassInfo({ classId }));
  }, [dispatch, classId]);

  return (
    <GridTemplate>
      <StClassSection>
        <div>classSection</div>
        {/* <VideoFrame /> */}
      </StClassSection>
      {/* <StChatSection>
        <ChatFrame />
      </StChatSection> */}
    </GridTemplate>
  );
};

export default ClassFrame;

const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  border-radius: ${(props) => props.theme.section.layout.boxShadow};
`;

const StClassSection = styled(StGrid)`
  grid-column: 1 / span 9;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StChatSection = styled(StGrid)`
  grid-column: 10 / span 3;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
