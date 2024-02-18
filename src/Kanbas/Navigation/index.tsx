import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaRegClock, FaRegShareSquare} from "react-icons/fa";
import {RiInboxArchiveFill} from "react-icons/ri";
import {TiDeviceDesktop} from "react-icons/ti";
import {IoHelpCircleOutline} from "react-icons/io5";
import {TbLetterN} from "react-icons/tb";

function KanbasNavigation() {
    const links = [
        {icon: <TbLetterN className="icon-general fs-2" />, path: "https://northeastern.edu", isExternal: true },
        { label: "Account", icon: <FaRegUserCircle className="account-icon fs-2" />, path: "Account", isExternal: false },
        { label: "Dashboard", icon: <FaTachometerAlt className="icon-general fs-2" />, path: "Dashboard", isExternal: false },
        { label: "Courses",   icon: <FaBook className="icon-general fs-2" />, path: "Courses", isExternal: false},
        { label: "Calendar",  icon: <FaRegCalendarAlt className="icon-general fs-2" />, path: "Calendar", isExternal: false},
        { label: "Inbox",  icon: <RiInboxArchiveFill className="icon-general fs-2" />, path: "Inbox", isExternal: false},
        { label: "History",  icon: <FaRegClock className="icon-general fs-2" />, path: "History", isExternal: false},
        { label: "Studio",  icon: <TiDeviceDesktop className="icon-general fs-2" />, path: "Studio", isExternal: false},
        { label: "Commons",  icon: <FaRegShareSquare className="icon-general fs-2" />, path: "Commons", isExternal: false},
        { label: "Help",  icon: <IoHelpCircleOutline className="icon-general fs-2" />, path: "Help", isExternal: false}
    ];

    const { pathname } = useLocation();

    return (
        <ul className="wd-kanbas-navigation">
            {links.map((link, index) => (
                <li key={index} className={pathname.includes(link.path) && !link.isExternal ? "wd-active" : ""}>
                    {link.isExternal ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer">
                            {link.icon} {link.label}
                        </a>
                    ) : (
                        <Link to={`/Kanbas/${link.path}`}>
                            {link.icon} {link.label}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default KanbasNavigation;
