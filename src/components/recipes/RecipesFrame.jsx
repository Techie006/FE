import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";
import RecipesHeader from "./RecipesHeader";
import Recipes from "./Recipes";

const RecipesFrame = () => {
  return (
    <GridTemplate height='114px'>
      <StHeader>
        <RecipesHeader />
      </StHeader>
      <Recipes />
    </GridTemplate>
  );
};

export default RecipesFrame;

const StHeader = styled.div`
  grid-column: 1 / span 12;
  height: 114px;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
