import ProjectsHeader from "@components/Projects/ProjectsHeader";
import { GoHome } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import NewProjectForm from "@components/Projects/NewProjectForm";

const Breadcrumbs = [
  {
    title: "Home",
    href: "/",
    icon: <GoHome />,
  },
  {
    title: "Project",
    href: "/",
    icon: <BsBox />,
  },
  {
    title: "New",
    icon: <HiOutlineDocumentAdd />,
  },
];
const NewProject = () => {
  return (
    <>
      <ProjectsHeader title="Add new project" bc={Breadcrumbs} />
      <NewProjectForm />
    </>
  );
};

export default NewProject;
