import { ThemeContext } from "@lib/ThemeContext";
import { useContext } from "react";
import { BiSun } from "react-icons/bi";
import { RiMoonClearFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme}
        className="text-primary-500 dark:text-yellow-500 text-2xl cursor-pointer"
      >
        {theme === "dark" ? (
          <BiSun
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        ) : (
          <RiMoonClearFill
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeToggle;
