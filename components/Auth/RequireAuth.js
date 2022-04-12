import { useContext, useEffect } from "react";
import AuthContext from "@lib/AuthContext";
import { useRouter } from "next/router";
import LoadingScreen from "@components/Global/LoadingScreen";

const RequireAuth = ({ role, children, fallback }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);
  return user ? children : <LoadingScreen />;
};

export default RequireAuth;
