import Ingredients from "./Ingredients";
import Categories from "./Categories";
import Daily from "./Daily";
import Calories from "./Calories";
// import Nutrients from "./Nutrients";

const StatisticsLayout = () => {
  return (
    <>
      <div>StatisticsLayout</div>
      <Ingredients />
      <Categories />
      <Daily />
      <Calories />
      {/* <Nutrients /> */}
    </>
  );
};

export default StatisticsLayout;
