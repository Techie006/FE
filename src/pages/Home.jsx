import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import HomeLayout from "../components/home/HomeLayout";
import Helper from "../elements/organisms/Helper";

const Home = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <HomeLayout />
        <Helper />
      </Layout>
    </>
  );
};

export default Home;
