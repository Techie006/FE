import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import BookMarkRecipeLayout from "../components/recipes/BookMarkRecipeLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const BookMarkRecipe = (props) => {
  return (
    <>
      <Layout>
        {/* <Header /> */}
        <BookMarkRecipeLayout />
        <Helper />
        <Footer />
      </Layout>
    </>
  );
};

export default BookMarkRecipe;