import React from "react";
import "./DarkMode.css";
import { useState, useEffect } from "react";

const DarkMode = ({ handleChange, isChecked }) => {

  const [isDark, setIsDark] = useState(() => {
  const savedValue = localStorage.getItem("isDark");
  return savedValue === "true"; 
});
 useEffect(() => {
  localStorage.setItem("isDark", isDark);
}, [isDark]);

  return (
    <div className="toggle-container">
      <div class="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={isChecked}
          onChange={handleChange}
        />
     
      </div>
    </div>
  );
};

export default DarkMode;
