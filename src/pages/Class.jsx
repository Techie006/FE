import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import ClassFrame from "../components/class/ClassFrame";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassFrame />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
