import React from "react";

const DropdownFilter = ({
  title,
 
  options,
  func,
 
}) => {
  return (
    <div className="dropdown-container">
      <select className="dropdown" onChange={func}>
        <option value="" disabled>
         {title?.toUpperCase()}
        </option>
        {options?.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>

    </div>
  );
};

export default DropdownFilter;
