import styled from "styled-components";
import { StTitle } from "../../elements/texts/pageTexts";

import Ingredients from "./Ingredients";
import Categories from "./Categories";

const Status = (props) => {
  return (
    <>
      <StTitle>오늘 우리집 식재료 상태는?</StTitle>
      <StDivider>
        <Ingredients />
        <Categories />
      </StDivider>
    </>
  );
};

export default Status;

const StDivider = styled.div`
  display: grid;
  justify-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(2, 50%);
  @media all and (max-width: 600px) {
    grid-template-columns: repeat(1, 100%);
  }
`;
