import styled from "styled-components";

import SectionLayout from "../common/SectionLayout";
import Ingredients from "./Ingredients";
import Categories from "./Categories";
import Daily from "./Daily";
import Calories from "./Calories";
import Nutrients from "./Nutrients";

const StatisticsLayout = () => {
  return (
    <>
      <SectionLayout title='Ingredients'>
        <Ingredients />
        <Categories />
      </SectionLayout>
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
