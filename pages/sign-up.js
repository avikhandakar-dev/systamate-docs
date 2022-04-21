import SignupForm from "@components/Auth/SignupForm";
import AuthLayout from "layouts/auth";
import Head from "next/head";

const SignInPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <SignupForm />
      </div>
    </>
  );
};

SignInPage.layout = AuthLayout;
export default SignInPage;
