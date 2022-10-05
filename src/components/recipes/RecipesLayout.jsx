import Recipes from "./Recipes";
import GridTemplate from "../../elements/templates/GridTemplate";
import styled from "styled-components";
const RecipesLayout = (props) => {
  return (
    <>
      {/* <GridTemplate>
        <StRecipeSection> */}
        <Recipes />
        {/* </StRecipeSection>
      </GridTemplate> */}
    </>
  );
};

export default RecipesLayout;

const StGrid = styled.div`
  // background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  // box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;

const StRecipeSection = styled(StGrid)`
  grid-column: 1 / span 12;
  height: auto;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
