import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import ClassesLayout from "../components/classes/ClassesLayout";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      <ClassesLayout />
    </Layout>
  );
};

export default Class;
