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
    <>
      <StWrapper>
        <StTitle>오늘 우리집 냉장고 상태는?</StTitle>
        <StDivider>
          <Ingredients />
          <Categories />
        </StDivider>
      </StWrapper>
      <SectionLayout title='Daily'>
        <Daily />
      </SectionLayout>
      <SectionLayout title='Calories'>
        <Calories />
      </SectionLayout>
      <SectionLayout title='Nutrients'>
        <Nutrients />
      </SectionLayout>
    </>
  );
};

export default StatisticsLayout;

const StWrapper = styled.div`
  width: 622px;
  height: 349px;
  padding: 18px 18px;
  background: ${(props) => props.theme.section.layout.background};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
`;

const StDivider = styled.div`
  display: flex;
  flex-direction: row;
`;

const StTitle = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: white;
`;
