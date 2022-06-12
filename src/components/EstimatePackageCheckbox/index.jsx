import React from "react";

const EstimatePackageCheckbox = ({
  title = "",
  description = "",
  value = 0,
  changeValue = () => {},
  options = [],
}) => {
  const [_value, setValue] = React.useState(
    () => options[value]?.value || value
  );

  const onChange = (index) => {
    setValue(index);
    changeValue(index);
  };

  return (
    <div className="package__detail">
      <section>
        <div className="description">
          <h3>{title}</h3>
          <small>{description}</small>
        </div>
        <div className="value">
          <div className="boxes">
            {options.map((item, index) => (
              <div
                key={"checkbox-" + index}
                onClick={() => onChange(index)}
                className={`checkbox ${_value === index ? "active" : ""}`}
              >
                <span>{item.value}</span>
                <small>{item.type}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstimatePackageCheckbox;
