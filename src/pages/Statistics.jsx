import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import StatisticsFrame from "../components/statistics/StatisticsFrame";
import Helper from "../elements/organisms/Helper";

const Statistics = (props) => {
  return (
    <Layout>
      <Header />
      <StatisticsFrame />
      <Helper />
    </Layout>
  );
};

export default Statistics;
