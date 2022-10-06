import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import ClassesFrame from "../components/classes/ClassesFrame";
import Helper from "../elements/organisms/Helper";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassesFrame />
      <Helper />
    </Layout>
  );
};

export default Class;
