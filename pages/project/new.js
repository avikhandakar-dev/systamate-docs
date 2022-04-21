import ProjectsHeader from "@components/Projects/ProjectsHeader";
import { BsBox } from "react-icons/bs";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import NewProjectFormStepper from "@components/Projects/NewProjectFormStepper";
import Head from "next/head";

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
      <Head>
        <title>New Project</title>
      </Head>
      <ProjectsHeader title="Add new project" bc={Breadcrumbs} />
      <NewProjectFormStepper />
    </>
  );
};

export default NewProject;
