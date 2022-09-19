import styled from "styled-components";
import { H2 } from "../../styles/Text";

import Ingredients from "./Ingredients";
import Categories from "./Categories";

const Status = (props) => {
  return (
    <>
      <H2>오늘 우리집 식재료 상태는?</H2>
      <StLayout>
        <Ingredients />
        <Categories />
      </StLayout>
    </>
  );
};

export default Status;

const StLayout = styled.div`
  display: grid;
  justify-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(2, 50%);
  @media all and (max-width: 600px) {
    grid-template-columns: repeat(1, 100%);
  }
`;
