import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import RecipesLayout from "../components/recipes/RecipesLayout";
import Helper from "../elements/organisms/Helper";

const Recipes = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <RecipesLayout />
        <Helper />
      </Layout>
    </>
  );
};

export default Recipes;
