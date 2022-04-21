import LoginForm from "@components/Auth/LoginForm";
import AuthLayout from "layouts/auth";
import Head from "next/head";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
};

LoginPage.layout = AuthLayout;
export default LoginPage;
