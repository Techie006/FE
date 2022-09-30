import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";
import VideoFrame from "./VideoFrame";
import ChatFrame from "./ChatFrame";

const ClassFrame = () => {
  return (
    <GridTemplate>
      <StClassSection>
        <VideoFrame />
      </StClassSection>
      <StChatSection>
        <ChatFrame />
      </StChatSection>
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
