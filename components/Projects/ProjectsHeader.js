import Link from "next/link";

const ProjectsHeader = ({ title = "Projects", bc }) => {
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-700">
      <div className="container max-w-screen-xl mx-auto py-6">
        <h1 className="text-xl font-medium">{title}</h1>
        {bc && (
          <div className="text-sm breadcrumbs">
            <ul>
              {bc.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <Link href={item.href}>
                      <a className="flex gap-2 items-center text-primary-500 font-medium">
                        {item.icon && <span>{item.icon}</span>}
                        <span>{item.title}</span>
                      </a>
                    </Link>
                  ) : (
                    <div className="flex gap-2 items-center text-gray-500">
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.title}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsHeader;
