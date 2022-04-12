import LoginForm from "@components/Auth/LoginForm";
import AuthLayout from "layouts/auth";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  );
};

LoginPage.layout = AuthLayout;
export default LoginPage;
