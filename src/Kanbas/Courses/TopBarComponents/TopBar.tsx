import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaBars, FaGlasses } from "react-icons/fa";
import { courses } from "../../Database";
import "bootstrap/dist/css/bootstrap.min.css";
import TopLeftModal from "./TopLeftModal";
import TopRightDropdown from "./TopRightDropdown";

const TopBar: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === courseId);
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  const inCoursePath = pathname.includes("Kanbas/Courses");

  // Function to toggle the modal's visibility
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="d-md-none bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-12 py-2">
              <div className="d-flex justify-content-between align-items-center">
                {/*Modal button*/}
                <div>
                  <button className="btn btn-dark" onClick={toggleModal}>
                    <FaBars />
                  </button>
                </div>
                <div className="text-center">
                  {/* Display the course ID and the current page dynamically */}
                  <div>{course ? `${course.number}.${courseId}` : ""}</div>
                  <div>
                    {pathname.split("/")[pathname.split("/").length - 1]}
                  </div>
                </div>
                <div className="d-flex">
                  <button className="btn btn-dark btn-sm">
                    <FaGlasses />
                  </button>
                  {/* Render only if in 'Kanbas/Courses' path */}
                  {inCoursePath && (
                    <div className="d-flex">
                      {/* Dropdown menu on the right side */}
                      <TopRightDropdown />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal for fa-bars menu on the left side */}
        <TopLeftModal showModal={showModal} handleClose={toggleModal} />
      </div>
    </>
  );
};

export default TopBar;
