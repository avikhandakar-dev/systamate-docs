import ProjectsHeader from "@components/Projects/ProjectsHeader";
import { useRouter } from "next/router";
import { BsBox } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { fetchGetJSON } from "@lib/utils";
import LoadingScreen from "@components/Global/LoadingScreen";
import { AiFillFile } from "react-icons/ai";
import ScopesViewer from "@components/Scopes/ScopesViewer";
import { GlobalContext } from "@lib/GlobalContext";
import Head from "next/head";

const ProjectView = () => {
  const { doRefrash } = useContext(GlobalContext);
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const Breadcrumbs = [
    {
      title: "Project",
      href: "/",
      icon: <BsBox />,
    },
    {
      title: project.projectName || id || "Name",
      icon: <AiFillFile />,
    },
  ];

  useEffect(() => {
    const getProject = async () => {
      if (id) {
        setIsLoading(true);
        const response = await fetchGetJSON(`/api/project/get/${id}`);
        if (response.statusCode === 200) {
          setProject(response.data);
        }
        setIsLoading(false);
      }
    };
    getProject();
  }, [id, doRefrash]);
  return (
    <>
      <Head>
        <title>{project.projectName || "Project"}</title>
      </Head>
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <>
          <ProjectsHeader title="Project" bc={Breadcrumbs} />
          <ScopesViewer project={project} />
        </>
      )}
    </>
  );
};

export default ProjectView;
