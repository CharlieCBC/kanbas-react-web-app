import React from "react";
import { Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegShareSquare,
} from "react-icons/fa";
import "./modal.css";
import { RiInboxArchiveFill } from "react-icons/ri";
import { TiDeviceDesktop } from "react-icons/ti";
import { IoHelpCircleOutline } from "react-icons/io5";

interface TopLeftModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const TopLeftModal: React.FC<TopLeftModalProps> = ({
  showModal,
  handleClose,
}) => {
  const links = [
    {
      icon: <FaTachometerAlt />,
      label: "Dashboard",
      path: "Dashboard",
    },
    {
      icon: <FaUserCircle className="icon-always-grey" />,
      label: "Account",
      path: "Account",
    },
    {
      icon: <FaBook />,
      label: "Courses",
      path: "Courses",
    },
    {
      label: "Calendar",
      icon: <FaRegCalendarAlt />,
      path: "Calendar",
    },
    {
      label: "Inbox",
      icon: <RiInboxArchiveFill />,
      path: "Inbox",
    },
    {
      label: "History",
      icon: <FaRegClock />,
      path: "History",
    },
    {
      label: "Studio",
      icon: <TiDeviceDesktop />,
      path: "Studio",
    },
    {
      label: "Commons",
      icon: <FaRegShareSquare />,
      path: "Commons",
    },
    {
      label: "Help",
      icon: <IoHelpCircleOutline />,
      path: "Help",
    },
  ];

  const { pathname } = useLocation();

  const handleLinkClick = (path: string) => {
    if (pathname.includes(path)) {
      handleClose();
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Kanbas Navigation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {links.map((link, index) => (
            <li key={index} className="top-left-modal">
              <Link
                to={`/Kanbas/${link.path}`}
                className="top-left-modal"
                onClick={() => handleLinkClick(link.path)}
              >
                {link.icon} <span className="ms-2">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default TopLeftModal;
