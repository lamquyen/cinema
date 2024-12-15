import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import "./Header.css";
const Dropdown = ({ options, placeholder, onSelect, herf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown  " ref={dropdownRef}>
      <button className="dropdown-toggle flex items-center h-fit text-gray-600 " onClick={handleToggle}>
        {placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              <Link to={`/${herf}/:${option}`}>{option}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;