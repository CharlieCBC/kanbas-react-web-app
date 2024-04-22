import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { FaHome, FaBook, FaBars, FaFileAlt, FaChartBar } from "react-icons/fa";
import "./dropdown.css";
import { GoCommentDiscussion } from "react-icons/go";

const TopRightDropdown = () => {
  const links = [
    { name: "Home", icon: <FaHome /> },
    { name: "Modules", icon: <FaBook /> },
    { name: "Piazza", icon: <GoCommentDiscussion /> },
    { name: "Grades", icon: <FaChartBar /> },
    { name: "Assignments", icon: <FaFileAlt /> },
  ];
  const { pathname } = useLocation();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" color="black" id="dropdown-basic">
        <FaBars />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {links.map((link, index) => (
          <Dropdown.Item
            key={index}
            as={Link}
            to={link.name}
            className={pathname.includes(link.name) ? "wd-active" : ""}
          >
            {link.icon} {link.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TopRightDropdown;
