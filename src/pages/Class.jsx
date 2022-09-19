import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
// import LiveChatLayout from "../components/class/LiveChatLayout";
import Helper from "../components/common/Helper";
import Footer from "../components/common/Footer";

const Class = (props) => {
  return (
    <Layout>
      <Header />
      {/* <LiveChatLayout /> */}
      <Helper />
      <Footer />
    </Layout>
  );
};

export default Class;
