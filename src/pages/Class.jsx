import Layout from "../elements/templates/Layout";
// import Header from "../elements/organisms/Header";
import Header from "../components/common/Header";
import ClassFrame from "../components/class/ClassFrame";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassFrame />
    </Layout>
  );
};

export default Class;
