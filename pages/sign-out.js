import LoadingScreen from "@components/Global/LoadingScreen";
import AuthContext from "@lib/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const SignOut = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    setUser(null);
    setToken(null);
    router.push("/");
  }, []);
  return <LoadingScreen />;
};

export default SignOut;
