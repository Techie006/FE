import styled from "styled-components";

import SectionLayout from "../common/SectionLayout";
import Ingredients from "./Ingredients";
import Categories from "./Categories";
import Daily from "./Daily";
import Calories from "./Calories";
import Nutrients from "./Nutrients";

import UnderlineCategory from "../../elements/categories/UnderlineCategory";

const StatisticsLayout = () => {
  return (
    <StWrapper>
      <StSection>
        <StTitle>오늘 우리집 냉장고 상태는?</StTitle>
        <StDivider>
          <Ingredients />
          <Categories />
        </StDivider>
      </StSection>
      <StSection>
        <StTitle>오늘 나의 식단 상태는?</StTitle>
        <Daily />
      </StSection>
      <StSection>
        <StTitle>나의 열량 섭취 변화</StTitle>
        <Calories />
      </StSection>
      <StSection>
        <StTitle>나의 영양 성분 변화</StTitle>
        <Nutrients />
      </StSection>
    </StWrapper>
  );
};

export default StatisticsLayout;

const StWrapper = styled.div`
  display: grid;
  grid-auto-rows: minmax(349px, auto);
  padding: 20px 84px;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 20px 30px;
    grid-template-columns: repeat(2, 50%);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }
  /* mobile */
  @media all and (max-width: 600px) {
    padding: 16px 16px;
    grid-template-columns: repeat(1, 100%);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
`;

const StSection = styled.div`
  padding: 18px 18px;
  background: ${(props) => props.theme.section.layout.background};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
`;

const StDivider = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  @media all and (max-width: 600px) {
    grid-template-columns: repeat(1, 100%);
  }
`;

const StTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: inherit;
`;
