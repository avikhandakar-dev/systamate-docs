import LoadingScreen from "@components/Global/LoadingScreen";
import { GlobalContext } from "@lib/GlobalContext";
import { fetchGetJSON } from "@lib/utils";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import ProjectsHeader from "./ProjectsHeader";

const Myprojects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { doRefrash } = useContext(GlobalContext);
  useEffect(() => {
    const unsubs = async () => {
      setIsLoading(true);
      const response = await fetchGetJSON("/api/project");
      if (response.statusCode === 200) {
        setProjects(response.data);
      }
      setIsLoading(false);
    };
    unsubs();
  }, [doRefrash]);

  return (
    <>
      <ProjectsHeader />
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <div className="container max-w-screen-xl mx-auto">
          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <Link href="/project/new">
              <a className="p-4 rounded-md shadow border border-slate-100 dark:border-slate-700 w-full max-w-xl aspect-video sm:aspect-square bg-white dark:bg-slate-800/70 flex justify-center items-center flex-col gap-2">
                <FaPlus className="text-4xl text-gray-500" />
                <p className="text-gray-500 dark:text-gray-300">
                  Add new project
                </p>
              </a>
            </Link>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index + 1} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Myprojects;
