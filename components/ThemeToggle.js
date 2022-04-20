import { ThemeContext } from "@lib/ThemeContext";
import { useContext } from "react";
import { BiSun } from "react-icons/bi";
import { RiMoonClearFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="px-2 pt-4 pb-2 rounded-md">
      <div
        className={`h-6 w-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 dark:from-primary-400 dark:to-primary-500 text-white flex items-center cursor-pointer px-1.5 duration-300 ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <motion.div
          layout
          className="h-4 aspect-square rounded-full flex justify-center items-center bg-white overflow-hidden shadow-sm"
        >
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.span
              key={theme === "dark" ? "moon" : "sun"}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-xs ${
                theme === "dark" ? "text-primary-500" : "text-yellow-500"
              }`}
            >
              {theme === "dark" ? <RiMoonClearFill /> : <BiSun />}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggle;
