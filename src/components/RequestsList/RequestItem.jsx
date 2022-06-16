import { format } from "date-fns";
import React, { useMemo } from "react";

const RequestItem = ({ details, ...otherProps }) => {
  const personalDetails = useMemo(() => {
    return details.personalDetails;
  }, [details]);

  const estimation = useMemo(() => {
    return details.estimationData;
  }, [details]);

  const eventDate = useMemo(() => {
    const dt = new Date(personalDetails.date.seconds * 1000);

    console.log({ dt });

    return format(dt, "eeee, do MMMM yyyy");
  }, [personalDetails]);

  return (
    <div {...otherProps}>
      <div className="personal">
        <small className="date">{eventDate}</small>
        <h3>{personalDetails.fullName}</h3>
        <p className="email">{personalDetails.email}</p>
        <p className="location">
          Location: <b>{personalDetails.location}</b>, Contact:{" "}
          <a href={`tel:+977-${personalDetails.phone}`}>
            +977-{personalDetails.phone}
          </a>
        </p>
      </div>
      <div className="event"></div>
      <div className="controls"></div>
    </div>
  );
};

export default RequestItem;
