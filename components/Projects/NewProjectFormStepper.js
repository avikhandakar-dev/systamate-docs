import Stepper from "@components/Stepper";
import { fetchPostJSON } from "@lib/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import CoverageForm from "./CoverageForm";
import DetailsForm from "./DetailsForm";
import PeriodForm from "./PeriodForm";
import ScopeForm from "./ScopeForm";

const Steps = [
  {
    label: "Details",
  },
  {
    label: "Scope",
  },
  {
    label: "Period",
  },
  {
    label: "Coverage",
  },
];
const NewProjectFormStepper = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [projectDetails, setProjectDetails] = useState({});
  const [projectScope, setProjectScope] = useState({});
  const [projectPeriod, setProjectPeriod] = useState({});
  const [projectCoverage, setProjectCoverage] = useState({
    hostname: "",
    ipAddress: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const changeStep = (direction) => {
    let newStep = activeStep;
    direction === "next" ? newStep++ : newStep--;
    if (newStep > 0 && newStep <= Steps.length + 1) {
      setActiveStep(newStep);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await fetchPostJSON("/api/project", {
      ...projectDetails,
      ...projectScope,
      ...projectPeriod,
      ...projectCoverage,
    });

    if (response.statusCode === 200) {
      toast.success(response.message);
      return router.push("/");
    } else if (response.statusCode === 401) {
      toast.error(response.message);
      router.replace("/sign-out");
    } else {
      setIsLoading(false);
      return toast.error(response.message);
    }
  };
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Stepper activeStep={activeStep} stepsArray={Steps} />
      <div>
        {activeStep === 1 && (
          <DetailsForm
            projectDetails={projectDetails}
            setProjectDetails={setProjectDetails}
            next={() => changeStep("next")}
          />
        )}
        {activeStep === 2 && (
          <ScopeForm
            projectScope={projectScope}
            setProjectScope={setProjectScope}
            next={() => changeStep("next")}
            back={() => changeStep("back")}
          />
        )}
        {activeStep === 3 && (
          <PeriodForm
            projectPeriod={projectPeriod}
            setProjectPeriod={setProjectPeriod}
            next={() => changeStep("next")}
            back={() => changeStep("back")}
          />
        )}
        {activeStep === 4 && (
          <CoverageForm
            projectCoverage={projectCoverage}
            setProjectCoverage={setProjectCoverage}
            back={() => changeStep("back")}
            loading={isLoading}
            submit={() => {
              onSubmit();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NewProjectFormStepper;
