import React from "react";

const EstimatePackageDropdown = ({
  title = "",
  description = "",
  options = [],
  event = "",
  changeValue = () => {},
}) => {
  React.useEffect(() => {
    if (!event?.length) changeValue(options[0].value);
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    changeValue(e.target.value);
  };

  return (
    <div className="package__detail">
      <section>
        <div className="description">
          <h3>{title}</h3>
          <small>{description}</small>
        </div>
        <div className="value">
          <div className="dropdown">
            <select
              value={event}
              name="dropdown"
              id="dropdown"
              onChange={onChange}
            >
              {options.map((item, index) => (
                <option key={"dropdown-" + index} value={item.value || index}>
                  {item.label || item.value || index}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstimatePackageDropdown;
