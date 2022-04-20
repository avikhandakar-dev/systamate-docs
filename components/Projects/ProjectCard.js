import { GlobalContext } from "@lib/GlobalContext";
import { dateToString, fetchDeleteJSON } from "@lib/utils";
import Link from "next/link";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const ProjectCard = ({ project, index }) => {
  const { doRefrash, setDoRefrash } = useContext(GlobalContext);
  const handelDelete = async (id) => {
    const userAction = confirm(`Are you sure you want to delete this project?`);
    if (userAction) {
      const Request = async () => {
        try {
          await fetchDeleteJSON("/api/project", { id });
          setDoRefrash(!doRefrash);
          return "Project deleted successfully!";
        } catch (error) {
          throw new Error("Error deleting project!");
        }
      };
      toast.promise(Request(), {
        loading: <b>Loading...</b>,
        success: (data) => <b>{data}</b>,
        error: (err) => <b>{err.toString()}</b>,
      });
    }
  };
  return (
    <div className="p-4 relative overflow-hidden rounded-md shadow border border-slate-100 dark:border-slate-700 w-full max-w-xl aspect-video sm:aspect-square bg-white dark:bg-slate-800/70 group">
      <a
        onClick={() => handelDelete(project.id)}
        className="absolute right-4 top-4 text-red-500 duration-300 opacity-0 cursor-pointer pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
      >
        <FaTrashAlt />
      </a>

      <span className="text-[12rem] text-gray-200 dark:text-white leading-[80%] pointer-events-none dark:mix-blend-overlay opacity-30 absolute -right-4 -bottom-4 font-black font-cursive">
        {index}
      </span>
      <Link href="/project/[id]" as={`/project/${project.id}`}>
        <a>
          <div className="flex flex-col justify-between items-start h-full">
            <div>
              <p className="text-sm text-gray-500">
                {dateToString(project.createdAt)}
              </p>
              <div className="pt-2 pb-4">
                <h1 className="text-xl font-medium line-clamp-2">
                  {project.projectName}
                </h1>
                <p className="text-sm">{project.companyName}</p>
                <span className="w-8 h-1 bg-primary-500 block mt-1" />
              </div>
              <p className="text-sm italic text-gray-500 dark:text-gray-300">
                Scope : {project.scopes?.length || 0}
              </p>
            </div>
            <Link href="/project/[id]" as={`/project/${project.id}`}>
              <a className="btn btn-link btn-primary p-0 h-auto min-h-0">
                View
              </a>
            </Link>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProjectCard;
