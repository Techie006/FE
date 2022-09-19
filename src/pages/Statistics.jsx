import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
// import StatisticsLayout from "../components/statistics/StatisticsLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Statistics = (props) => {
  return (
    <Layout>
      <Header />
      {/* <StatisticsLayout /> */}
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Statistics;
