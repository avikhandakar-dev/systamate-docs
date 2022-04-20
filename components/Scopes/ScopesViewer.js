import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddNewScope from "./AddScope";
import ScopeCard from "./ScopeCard";

const ScopesViewer = ({ project }) => {
  const scopes = project.scopes || [];
  const [showNewScopeModal, setShowNewScopeModal] = useState(false);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-8">
        <div className="rounded-md border dark:border-slate-600">
          <div className="border-b px-6 py-4 dark:border-slate-600 bg-slate-100 dark:bg-slate-700">
            <p className="font-semibold text-lg">Scopes</p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <a
              onClick={() => setShowNewScopeModal(true)}
              className="p-4 cursor-pointer rounded-md shadow border border-slate-100 dark:border-slate-700 w-full max-w-xl aspect-video sm:aspect-square bg-white dark:bg-slate-800/70 flex justify-center items-center flex-col gap-2"
            >
              <FaPlus className="text-4xl text-gray-500" />
              <p className="text-gray-500 dark:text-gray-300">Add scope</p>
            </a>
            {scopes.map((scope) => (
              <ScopeCard key={scope.id} scope={scope} project={project} />
            ))}
          </div>
        </div>
      </div>

      {showNewScopeModal && (
        <AddNewScope
          isOpen={showNewScopeModal}
          closeModal={() => setShowNewScopeModal(false)}
          projectId={project.id}
        />
      )}
    </>
  );
};

export default ScopesViewer;
