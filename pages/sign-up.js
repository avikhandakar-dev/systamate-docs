import SignupForm from "@components/Auth/SignupForm";
import AuthLayout from "layouts/auth";

const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <SignupForm />
    </div>
  );
};

SignInPage.layout = AuthLayout;
export default SignInPage;
