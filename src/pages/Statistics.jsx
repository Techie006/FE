import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import StatisticsFrame from "../components/statistics/StatisticsFrame";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Statistics = (props) => {
  return (
    <Layout>
      <Header />
      <StatisticsFrame />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Statistics;
