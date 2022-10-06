import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import HomeLayout from "../components/home/HomeLayout";

const Home = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <HomeLayout />
      </Layout>
    </>
  );
};

export default Home;
