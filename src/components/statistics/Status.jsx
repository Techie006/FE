import styled from "styled-components";

import Ingredients from "./Ingredients";
import Categories from "./Categories";

const Status = (props) => {
  return (
    <>
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
