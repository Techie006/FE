import Layout from "../elements/templates/Layout";
import AuthFrame from "../components/auth/AuthFrame";
import Helper from "../elements/organisms/Helper";

const Auth = (props) => {
  return (
    <>
      <Layout>
        <AuthFrame />
        <Helper />
      </Layout>
    </>
  );
};

export default Auth;
