import GridTemplate from "../../elements/templates/GridTemplate";
import styled from "styled-components";

import Ingredients from "./Ingredients";
import Daily from "./Daily";
import Changes from "./Changes";

const StatisticsFrame = () => {
  return (
    <GridTemplate height='minmax(349px, auto)'>
      <StLeftSection>
        <Ingredients />
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
