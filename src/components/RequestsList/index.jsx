import { format, isPast } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdminRequests } from "../../hooks/useAdminRequests";
import { useAdminPhotographers } from "../../hooks/useAdminPhotographers";

import DataTable from "react-data-table-component";

import "./styles.css";

const _durations = ["<4 hrs", "<8 hrs", "1 day", "2 days", "3 days"];

const _columns = (onAction = () => {}) => [
  {
    name: "Client",
    selector: (row) => row.personalDetails.fullName,
  },
  {
    name: "Venue",
    selector: (row) => row.personalDetails.location,
  },
  {
    name: "Date",
    cell: (row) => (
      <div>
        {format(
          new Date(row.personalDetails.date.seconds * 1000),
          "eeee, do MMMM yyyy"
        )}
      </div>
    ),
  },
  {
    name: "Type",
    center: true,
    cell: (row) => (
      <div className="cell__event__type">
        {row.estimationData?.eventType || "TBD"}
      </div>
    ),
  },
  {
    name: "Duration",
    center: true,
    selector: (row) =>
      row.estimationData?.eventDuration <= 4
        ? _durations[row.estimationData.eventDuration]
        : "TBD",
  },
  {
    name: "Camera/Video",
    center: true,
    cell: (row) => (
      <>
        {row.estimationData?.cameraCount || "0"}/
        {row.estimationData?.videoCount || "0"}
      </>
    ),
  },
  {
    name: "Estimated",
    center: true,
    cell: (row) => <>Rs. {row.estimationData?.estimation || "TBD"}</>,
  },
  {
    name: "Contact",
    cell: (row) => (
      <a href={`tel:+977-${row.personalDetails.phone}`}>
        +977-{row.personalDetails.phone}
      </a>
    ),
  },
  {
    name: "Photographer",
    cell: (row) => (
      <>{row.photographerProfile?.fullName || <i>not specified</i>}</>
    ),
  },
  {
    name: "Status",
    center: true,
    cell: (row) => (
      <div className={`status ${row.status}`}>{row.status || "Undecided"}</div>
    ),
  },
  {
    name: "",
    cell: (row) => (
      <div className="requests__controls">
        {row.status !== "active" ? (
          <button onClick={() => onAction(row, true)}>Accept</button>
        ) : null}
        {row.status !== "declined" ? (
          <button onClick={() => onAction(row, false)}>Decline</button>
        ) : null}
      </div>
    ),
  },
];

const RequestsList = () => {
  const { requests, loading, getHireRequestList, updateHireStatus } =
    useAdminRequests();
  const {
    getPhotographerList,
    loading: photographersLoading,
    photographers,
  } = useAdminPhotographers();

  const [filter, setFilter] = useState("undecided");

  const getPhotographerProfile = useCallback(
    (id = "") => {
      const ph = photographers.find((item) => item.id === id) || null;

      console.log({ ph, ps: photographers[0] });

      return ph;
    },
    [photographers]
  );

  const hire_requests = useMemo(() => {
    if (filter === "all") return requests;

    if (filter === "undecided")
      return requests.filter(
        (item) => !item.status || item.status === "undecided"
      );

    if (filter === "expired")
      return requests.filter((item) =>
        isPast(new Date(item.personalDetails.date.seconds * 1000))
      );
    if (filter === "active")
      return requests.filter((item) => item.status === "active");
    if (filter === "declined")
      return requests.filter((item) => item.status === "declined");
  }, [filter, requests]);

  useEffect(() => {
    getPhotographerList();
    if (!requests.length) getHireRequestList();
  }, [requests]);

  return (
    <div className="requests__list">
      {loading && <p>Loading...</p>}
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Hire Requests</h2>
        <div className="filters">
          {["all", "undecided", "active", "declined", "expired"].map(
            (item, idx) => (
              <div
                key={idx}
                className={`filter__item ${filter === item ? "active" : ""}`}
                onClick={() => setFilter(item)}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>
      <DataTable
        progressPending={loading || photographersLoading}
        data={hire_requests.map((item) => ({
          ...item,
          photographerProfile: getPhotographerProfile(
            item.personalDetails.photographer
          ),
        }))}
        columns={_columns(updateHireStatus)}
      />
    </div>
  );
};

export default RequestsList;
