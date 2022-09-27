import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import StatisticsFrame from "../components/statistics/StatisticsFrame";

const Statistics = (props) => {
  return (
    <Layout>
      <Header />
      <StatisticsFrame />
    </Layout>
  );
};

export default Statistics;
