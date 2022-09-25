import styled from "styled-components";

import { ST3 } from "../../styles/Text";
import DueStatus from "./DueStatus";
import CategoryStatus from "./CategoryStatus";

const Status = (props) => {
  return (
    <>
      <ST3>오늘 우리집 식재료 상태는?</ST3>
      <StLayout>
        <DueStatus />
        <CategoryStatus />
      </StLayout>
    </>
  );
};

export default Status;

// Section 내부 분할
const StLayout = styled.div`
  // @pc, tablet 2열 분할
  display: grid;
  justify-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);

  // @mobile 1열
  @media all and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
