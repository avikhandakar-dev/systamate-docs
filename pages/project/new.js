import ProjectsHeader from "@components/Projects/ProjectsHeader";
import { BsBox } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import NewProjectFormStepper from "@components/Projects/NewProjectFormStepper";

const Breadcrumbs = [
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
      <NewProjectFormStepper />
    </>
  );
};

export default NewProject;
