import Layout from "../elements/templates/Layout";
import Header from "../components/common/Header";
// import Header from "../elements/organisms/Header";
import RecipesLayout from "../components/recipes/RecipesLayout";

const Recipe = (props) => {
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <RecipesLayout />
      </Layout>
    </>
  );
};

export default Recipe;
