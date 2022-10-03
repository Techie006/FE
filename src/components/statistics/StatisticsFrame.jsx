import GridTemplate, { StGrid } from "../../elements/templates/GridTemplate";
import styled from "styled-components";

import Ingredients from "./Ingredients";
import Daily from "./Daily";
import Changes from "./Changes";

const StatisticsFrame = () => {
  return (
    <GridTemplate>
      <StLeftSection>
        <Ingredients fromMain={false} />
      </StLeftSection>
      <StRightSection>
        <Daily />
      </StRightSection>
      <StLeftSection>
        <Changes type='calorie' />
      </StLeftSection>
      <StRightSection>
        <Changes type='nutrients' />
      </StRightSection>
    </GridTemplate>
  );
};

export default StatisticsFrame;

const StLeftSection = styled(StGrid)`
  padding: 16px 18px;
  grid-column: 1 / span 6;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StRightSection = styled(StGrid)`
  padding: 16px 18px;
  grid-column: 7 / span 6;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
