import ProjectsHeader from "@components/Projects/ProjectsHeader";
import { useRouter } from "next/router";
import { BsBox } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { fetchGetJSON } from "@lib/utils";
import LoadingScreen from "@components/Global/LoadingScreen";
import { AiFillFile } from "react-icons/ai";
import ScopesViewer from "@components/Scopes/ScopesViewer";
import { GlobalContext } from "@lib/GlobalContext";
import IssuesViewer from "@components/Issues/IssuesViewer";
import Head from "next/head";

const ScopeView = () => {
  const { doRefrash } = useContext(GlobalContext);
  const router = useRouter();
  const { id } = router.query;
  const [scope, setScope] = useState({});
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const Breadcrumbs = [
    {
      title: "Project",
      href: "/",
      icon: <BsBox />,
    },
    {
      title: project.projectName || "",
      href: `/project/${project.id}`,
      icon: <AiFillFile />,
    },
    {
      title: scope.name || id || "Name",
      icon: <AiFillFile />,
    },
  ];

  useEffect(() => {
    const getScope = async () => {
      if (id) {
        setIsLoading(true);
        const response = await fetchGetJSON(`/api/scope/get/${id}`);
        if (response.statusCode === 200) {
          setScope(response.data.scope);
          setProject(response.data.project);
        }
        setIsLoading(false);
      }
    };
    getScope();
  }, [id, doRefrash]);
  return (
    <>
      <Head>
        <title>{scope.name || "Scope"}</title>
      </Head>
      {isLoading ? (
        <LoadingScreen fullScreen={false} />
      ) : (
        <>
          <ProjectsHeader title="Scope" bc={Breadcrumbs} />
          <IssuesViewer scope={scope} project={project} />
        </>
      )}
    </>
  );
};

export default ScopeView;
