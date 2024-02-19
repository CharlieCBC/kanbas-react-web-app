import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  FaBars,
  FaGlasses,
  FaTachometerAlt,
  FaUserCircle,
  FaBook,
  FaPlug,
  FaHome,
} from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { courses } from "../Database";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const TopBar: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === courseId);

  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div className="d-md-none bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-12 py-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button className="btn btn-dark btn-sm" onClick={handleShow}>
                    <FaBars />
                  </button>
                </div>
                <div className="text-center">
                  {/* Display the course ID and the current page dynamically */}
                  <div>
                    {course ? `${course.number}.${courseId}` : "Course ID"}
                  </div>
                  <div>
                    {pathname.split("/")[pathname.split("/").length - 1]}
                  </div>
                </div>
                <div>
                  <button className="btn btn-dark btn-sm">
                    <FaGlasses />
                  </button>
                  {/* Dropdown menu on the right side */}
                  <div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="dark"
                        id="dropdown-basic"
                        className="btn-sm"
                      >
                        <MdOutlineKeyboardArrowDown />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="wd-course-nav-menu">
                        <Dropdown.Item
                          as={Link}
                          to={`/Kanbas/Courses/${courseId}/Home`}
                        >
                          <FaHome /> Home
                        </Dropdown.Item>
                        <Dropdown.Item
                          as={Link}
                          to={`/Kanbas/Courses/${courseId}/Modules`}
                        >
                          <FaBook /> Modules
                        </Dropdown.Item>
                        {/* Other Dropdown Items */}
                        <Dropdown.Item href="http://piazza.com">
                          <FaPlug /> Piazza
                        </Dropdown.Item>
                        {/* Additional menu items */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for fa-bars menu on the left side */}
        <Modal
          show={showModal}
          onHide={handleClose}
          id="sidebarMenuModal"
          tabIndex={-1}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Kanbas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul className="wd-kanbas-nav-menu">
                {/* Convert these to <Link> as needed */}
                <li>
                  <Link to="/Kanbas/Dashboard/screen.html">
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/Kanbas/Account/Profile/screen.html">
                    <FaUserCircle /> Account
                  </Link>
                </li>
                <li>
                  <Link to="/Kanbas/Courses/Home/screen.html">
                    <FaBook /> Courses
                  </Link>
                </li>
                {/* Add other links here */}
              </ul>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
};

export default TopBar;
