import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import BookMarkRecipeLayout from "../components/recipes/BookMarkRecipeLayout";
import Helper from "../elements/organisms/Helper";

const BookMarkRecipe = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <BookMarkRecipeLayout />
        <Helper />
      </Layout>
    </>
  );
};

export default BookMarkRecipe;
