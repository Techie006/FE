import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import RecipesLayout from "../components/recipes/RecipesLayout";

const Recipe = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <RecipesLayout />
      </Layout>
    </>
  );
};

export default Recipe;
