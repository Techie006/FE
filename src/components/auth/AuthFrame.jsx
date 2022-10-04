import styled from "styled-components";

import GridTemplate, { StGrid } from "../../elements/templates/GridTemplate";
import InfoFrame from "./InfoFrame";
import FormFrame from "./FormFrame";

const AuthFrame = () => {
  return (
    <>
      <GridTemplate>
        <StLeftSection>
          <InfoFrame />
        </StLeftSection>
        <StRightSection>
          <FormFrame />
        </StRightSection>
      </GridTemplate>
    </>
  );
};

export default AuthFrame;

const StLeftSection = styled(StGrid)`
  padding: 16px 18px;
  background: inherit;
  /* box-shadow: none; */
  grid-column: 1 / span 8;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StRightSection = styled(StGrid)`
  background: inherit;
  width: 406px;
  /* box-shadow: none; */
  /* grid-column: 7 / span 6; */

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
