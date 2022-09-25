import GridTemplate from "../../elements/templates/GridTemplate";
import styled from "styled-components";

import Status from "./Status";
import Daily from "./Daily";
import Calories from "./Calories";
import Nutrients from "./Nutrients";

const StatisticsFrame = () => {
  return (
    <GridTemplate height='minmax(349px, auto)'>
      <StLeftSection>
        <Status />
      </StLeftSection>
      <StRightSection>
        <Daily />
      </StRightSection>
      <StLeftSection>{/* <Calories /> */}</StLeftSection>
      <StRightSection>{/* <Nutrients /> */}</StRightSection>
    </GridTemplate>
  );
};

export default StatisticsFrame;

const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  padding: 16px 18px;
`;

const StLeftSection = styled(StGrid)`
  grid-column: 1 / span 6;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StRightSection = styled(StGrid)`
  grid-column: 7 / span 6;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
