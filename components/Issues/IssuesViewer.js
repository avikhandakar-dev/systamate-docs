import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddNewIssue from "./AddIssue";
import IssueCard from "./IssueCard";

const IssuesViewer = ({ scope, project }) => {
  const issues = scope.issues || [];
  const [showNewIssueModal, setShowNewIssueModal] = useState(false);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-8">
        <div className="rounded-md border dark:border-slate-600">
          <div className="border-b px-6 py-4 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 flex items-center justify-between">
            <p className="font-semibold text-lg">Issues</p>
            <button
              onClick={() => setShowNewIssueModal(true)}
              className="btn btn-primary btn-sm rounded"
            >
              Add Issue
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>

      {showNewIssueModal && (
        <AddNewIssue
          isOpen={showNewIssueModal}
          closeModal={() => setShowNewIssueModal(false)}
          scopeId={scope.id}
          project={project}
        />
      )}
    </>
  );
};

export default IssuesViewer;
