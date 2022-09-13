import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import RecipesLayout from "../components/recipes/RecipesLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Recipe = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <RecipesLayout />
        <Helper />
        <Footer />
      </Layout>
    </>
  );
};

export default Recipe;