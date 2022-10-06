import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import BookMarkRecipeLayout from "../components/recipes/BookMarkRecipeLayout";

const BookMarkRecipe = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <BookMarkRecipeLayout />
      </Layout>
    </>
  );
};

export default BookMarkRecipe;
