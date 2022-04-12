import RequireAuth from "@components/Auth/RequireAuth";
import NavBar from "@components/Global/NavBar";

const DefaultLayout = ({ children }) => {
  return (
    <RequireAuth>
      <NavBar />
      {children}
    </RequireAuth>
  );
};

export default DefaultLayout;
