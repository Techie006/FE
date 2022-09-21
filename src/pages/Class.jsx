import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import ClassDetail from "../components/class/ClassDetail";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassDetail />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
