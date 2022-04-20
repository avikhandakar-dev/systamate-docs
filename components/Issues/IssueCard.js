import { dateToString, fetchDeleteJSON } from "@lib/utils";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import EditIssue from "./EditIssue";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "@lib/GlobalContext";

const IssueCard = ({ issue }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { doRefrash, setDoRefrash } = useContext(GlobalContext);

  const handelDelete = async (id) => {
    const userAction = confirm(`Are you sure you want to delete this issue?`);
    if (userAction) {
      const Request = async () => {
        try {
          await fetchDeleteJSON("/api/issue", { id: issue.id });
          setDoRefrash(!doRefrash);
          return "Issue deleted successfully!";
        } catch (error) {
          throw new Error("Error deleting issue!");
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
    <>
      <div className="p-4 relative overflow-hidden rounded-md shadow border border-slate-100 dark:border-slate-700 w-full max-w-xl bg-white dark:bg-slate-800/70">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-medium line-clamp-2">{issue.title}</h1>
            <p className="text-sm text-gray-500">
              {dateToString(issue.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* <a
              onClick={() => handelDelete(issue.id)}
              className="text-green-500 duration-300 cursor-pointer text-xl"
            >
              <BsEyeFill />
            </a> */}
            <a
              onClick={() => setShowEditForm(true)}
              className="text-yellow-500 duration-300 cursor-pointer"
            >
              <FaEdit />
            </a>
            <a
              onClick={() => handelDelete(issue.id)}
              className="text-red-500 duration-300 cursor-pointer"
            >
              <FaTrashAlt />
            </a>
          </div>
        </div>
      </div>

      {showEditForm && (
        <EditIssue
          issue={issue}
          isOpen={showEditForm}
          closeModal={() => setShowEditForm(false)}
        />
      )}
    </>
  );
};

export default IssueCard;
