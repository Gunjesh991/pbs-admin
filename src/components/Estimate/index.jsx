import React from "react";
import EstimatePackageDropdown from "../EstimatePackageDropdown";
import EstimatePackageRangeInput from "../EstimatePackageRangeInput";
import EstimatePackageCheckbox from "../EstimatePackageCheckbox";

import "./estimate.css";
import useEstimate from "../../hooks/useEstimate";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const __eventType = [
  {
    label: "Anniversary",
    value: "anniversary",
  },
  {
    label: "Bachelorette Party",
    value: "bachelorette-party",
  },
  {
    label: "Birthday",
    value: "birthday",
  },
  {
    label: "Bride-To-Be",
    value: "bride-to-be",
  },
  {
    label: "Wedding",
    value: "wedding",
  },
  {
    label: "Wedding Photoshoot",
    value: "wedding-photoshoot",
  },
];
const __durations = [
  {
    value: "<4",
    type: "hour(s)",
  },
  {
    value: "<8",
    type: "hours",
  },
  {
    value: "1",
    type: "day",
  },
  {
    value: "2",
    type: "days",
  },
  {
    value: "3",
    type: "days",
  },
];

const Estimate = () => {
  const { estimation, estimationObj, updateEstimationObj, saveEstimation } =
    useEstimate();

  const { isSignedIn, signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const pidUrl = `/hire?pid=${
    new URLSearchParams(location.search).get("pid") || ""
  }`;

  const gotoHire = async () =>
    isSignedIn ? navigate(pidUrl) : (await signIn()) && navigate(pidUrl);

  const skipEstimation = () => {
    localStorage.removeItem("estimation");
    gotoHire();
  };

  const proceedToHire = () => {
    saveEstimation();
    gotoHire();
  };

  return (
    <>
      <div className="estimate">
        <div className="estimate__wrapper">
          {/* header */}
          <div className="estimate__header">
            <section>
              <h2>
                <span>Estimate</span> your cost
              </h2>
              <small>
                Choose packages that suits your need and analyse the estimated
                cost for your event.
              </small>
            </section>
          </div>
          {/* package details */}
          <EstimatePackageDropdown
            title="Type of Event"
            description="Pre-Wedding / Wedding / Post-Wedding / Birthday / Anniversary / Others..."
            options={__eventType}
            event={estimationObj.eventType}
            changeValue={(val) => updateEstimationObj("eventType", val)}
          />
          <EstimatePackageCheckbox
            title="Duration of event"
            description="How long do you want my service for the event?"
            options={__durations}
            value={estimationObj.eventDuration}
            changeValue={(val) => updateEstimationObj("eventDuration", val)}
          />
          <EstimatePackageRangeInput
            title="No. of Camera(s)"
            description="Total number of camera(s)/cameraperson required for still photos."
            min={1}
            count={estimationObj.cameraCount}
            onChange={(val) => updateEstimationObj("cameraCount", val)}
          />
          <EstimatePackageRangeInput
            title="No. of Video Camera(s)"
            description="Total number of camera(s)/cameraperson required for videography (if any)."
            min={0}
            max={4}
            count={estimationObj.videoCount}
            onChange={(val) => updateEstimationObj("videoCount", val)}
          />
        </div>
      </div>
      <div className="estimation__details">
        <section>
          <div className="estimation__details-wrapper">
            <div className="details">
              <span>Estimation:</span>
              <h3>NPR {estimation}/-</h3>
            </div>
            <div className="controls">
              <button className="outlined" onClick={skipEstimation}>
                Skip Estimation
              </button>
              <button onClick={proceedToHire}>Looks good? Proceed</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Estimate;
