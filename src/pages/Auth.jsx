import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import AuthLayout from "../components/auth/AuthLayout";
import Helper from '../components/common/Helper';

const Auth = (props) => {
  return (
    <>
      <Layout>
        <AuthLayout />
        <Helper/>
      </Layout>
    </>
  );
};

export default Auth;
