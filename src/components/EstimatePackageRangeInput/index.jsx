import React from "react";

const EstimatePackageRangeInput = ({
  min = 0,
  max = 5,
  title = "",
  description = "",
  count = 0,
  onChange = () => {},
}) => {
  const _onChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="package__detail">
      <section>
        <div className="description">
          <h3>{title}</h3>
          <small>{description}</small>
        </div>
        <div className="value">
          <div className="range">
            <div className="input__value">
              <span>{count}</span>
            </div>
            <input
              type="range"
              name="camerano"
              id="camerano"
              value={count}
              min={min}
              max={max}
              step={1}
              onChange={_onChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EstimatePackageRangeInput;
