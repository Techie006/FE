import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";
import FormFrame from "./FormFrame";

const AuthFrame = () => {
  return (
    <>
      <GridTemplate height='646px'>
        <StLayout>
          <FormFrame />
        </StLayout>
      </GridTemplate>
    </>
  );
};

export default AuthFrame;

const StLayout = styled.div`
  grid-column: 1 / span 12;
  display: grid;
  place-content: center;
  place-items: center;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
    margin-top: 20px;
  }
`;
