import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import ClassLayout from "../components/class/ClassLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassLayout />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
