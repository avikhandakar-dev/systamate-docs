import { downloadAsExcel, fetchDeleteJSON } from "@lib/utils";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "@lib/GlobalContext";
import toast from "react-hot-toast";
import Link from "next/link";

const ScopeCard = ({ scope, project }) => {
  const { doRefrash, setDoRefrash } = useContext(GlobalContext);

  const xlsxData = () => {
    const data = [];
    const coverageData = [];
    const rows = [];
    const rows2 = [];
    const headers = [
      "S/N",
      "Client",
      "System Name",
      "Area of Review",
      "Risk Rating",
      "Impact Rating",
      "Likelihood Rating",
      "CVE Rating",
      "CVSS Score",
      "CVSS Vector",
      "Issue Title",
      "Affected Host(s)",
      "Observation",
      "Implication",
      "Remediation",
      "Screenshot",
      "Management Comments",
      "Target Date",
      "Status",
      "Date Raised",
      "DT Owner",
      "Client Owner",
      "DT Follow Up Date",
      "Follow Up Comments",
      "DT Follow-Up Status",
    ];

    const headers2 = ["Hostname", "IP Address"];

    headers.forEach((header, index) => {
      rows.push({
        v: header,
        t: "s",
        s: {
          font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: {
            fgColor: { rgb: index < headers.length - 3 ? "513873" : "FD0101" },
          },
        },
      });
    });
    headers2.forEach((header, index) => {
      rows2.push({
        v: header,
        t: "s",
        s: {
          font: { bold: true, sz: 14, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: {
            fgColor: { rgb: "513873" },
          },
        },
      });
    });

    data.push(rows);
    coverageData.push(rows2);

    scope.issues.forEach((issue, index) => {
      const values = [
        index + 1,
        project.companyName,
        project.projectName,
        scope.name,
        issue.riskRating,
        issue.impactRating,
        issue.likelihoodRating,
        issue.CVERating,
        issue.CVSSRating,
        issue.CVSSVector,
        issue.title,
        issue.affectedHost,
        issue.observation,
        issue.implication,
        issue.remediation,
        issue.screenshot,
        issue.managementComments,
        issue.targetResolutionDate,
        issue.status,
        issue.dateRaised,
        issue.DTOwner,
        issue.projectOwner,
        issue.DTFollowUpDate,
        issue.followUpComments,
        issue.DTFollowUpStatus,
      ];

      const tmp = [];

      values.forEach((value, index) => {
        tmp.push({
          v: value,
          t: "s",
          s: {
            alignment: { horizontal: "center", vertical: "center" },
          },
        });
      });
      data.push(tmp);
    });

    coverageData.push([
      {
        v: project.hostname || "N/A",
        t: "s",
        s: {
          alignment: { horizontal: "center", vertical: "center" },
        },
      },
      {
        v: project.ipAddress || "N/A",
        t: "s",
        s: {
          alignment: { horizontal: "center", vertical: "center" },
        },
      },
    ]);

    return { data, coverageData };
  };

  const handelDownload = () => {
    if (!scope.issues.length) {
      toast.error("No issues to download!");
      return;
    }
    const { data, coverageData } = xlsxData();
    downloadAsExcel(data, coverageData);
  };
  const handelDelete = async (id) => {
    const userAction = confirm(`Are you sure you want to delete this scope?`);
    if (userAction) {
      const Request = async () => {
        try {
          await fetchDeleteJSON("/api/scope", { id });
          setDoRefrash(!doRefrash);
          return "Scope deleted successfully!";
        } catch (error) {
          throw new Error("Error deleting scope!");
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
      <div className="p-4 relative overflow-hidden rounded-md shadow border border-slate-100 dark:border-slate-700 w-full max-w-xl aspect-video sm:aspect-square bg-white dark:bg-slate-800/70 group">
        <a
          onClick={() => handelDelete(scope.id)}
          className="absolute right-4 top-4 text-red-500 duration-300 opacity-0 cursor-pointer pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100"
        >
          <FaTrashAlt />
        </a>
        <div className="flex flex-col justify-between items-start h-full">
          <div>
            <div className="pt-2 pb-4">
              <h1 className="text-xl font-medium line-clamp-2">{scope.name}</h1>
              <div className="flex items-center justify-between">
                <p className="text-sm italic text-gray-500 dark:text-gray-300">
                  Issue : {scope.issues?.length || 0}
                </p>
              </div>
            </div>
            <button
              onClick={() => handelDownload()}
              className="btn rounded btn-outline btn-primary dark:btn-secondary"
            >
              Download Trackingsheet
            </button>
          </div>
          <Link href={`/scope/${scope.id}`}>
            <a className="btn btn-link btn-primary p-0 h-auto min-h-0">Open</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ScopeCard;
