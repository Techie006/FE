import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import ClassesLayout from "../components/classes/ClassesLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassesLayout />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
