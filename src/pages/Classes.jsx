import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import ClassesFrame from "../components/classes/ClassesFrame";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassesFrame />
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
