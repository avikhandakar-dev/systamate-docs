import RequireAuth from "@components/Auth/RequireAuth";
import NavBar from "@components/Global/NavBar";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: -20 },
};
const DefaultLayout = ({ children }) => {
  return (
    <RequireAuth>
      <NavBar />
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, type: "easeInOut" }}
      >
        {children}
      </motion.div>
    </RequireAuth>
  );
};

export default DefaultLayout;
