import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "@components/ThemeToggle";
import AuthIcon from "@components/AuthIcon";

const NavBar = () => {
  return (
    <nav className="sticky z-40 left-0 top-0 w-full bg-white/70 dark:bg-slate-800/70 shadow-magical backdrop-blur-lg backdrop-saturate-150">
      <div className="w-full bg-color-ribbon h-[3px] relative z-10" />
      <div className="flex flex-col justify-center items-center w-full min-h-[64px]">
        <div className="w-full px-4 sm:px-8 lg:px-16 h-full flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>

          <div className="font-medium flex items-center justify-center space-x-4">
            <ThemeToggle />
            <AuthIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
