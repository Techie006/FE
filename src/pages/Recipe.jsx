import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import RecipesLayout from "../components/recipes/RecipesLayout";
import Helper from "../elements/organisms/Helper";

const Recipe = (props) => {
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

export default Recipe;
