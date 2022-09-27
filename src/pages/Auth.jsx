import Layout from "../elements/templates/Layout";
import Header from "../elements/organisms/Header";
import AuthLayout from "../components/auth/AuthLayout";

const Auth = (props) => {
  return (
    <>
      <Layout>
        <Header />
        <AuthLayout />
      </Layout>
    </>
  );
};

export default Auth;
