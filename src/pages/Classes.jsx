import Layout from "../elements/templates/Layout";
// import Header from "../elements/organisms/Header";
import Header from "../components/common/Header";
import ClassesFrame from "../components/classes/ClassesFrame";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassesFrame />
    </Layout>
  );
};

export default Class;
