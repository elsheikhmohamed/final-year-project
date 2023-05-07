import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined, MessageOutlined, SmartToyOutlined } from "@mui/icons-material";
import "./navPages.scss";

const NavPages = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    if (activeLink === link) {
      setActiveLink(null);
    } else {
      setActiveLink(link);
    }
  };

  return (
    <nav className="navpages">
      <div className="navpages-left">
        <Link
          to="/"
          className={`navpages-link ${activeLink === null && location.pathname === "/" ? "active" : ""}`}
          onClick={() => handleLinkClick(null)}
        >
          <HomeOutlined className="navpages-icon" style={{ fontSize: 30 }} />
        </Link>
        <Link
          to="/chatBox"
          className={`navpages-link ${activeLink === "/chatBox" || location.pathname === "/chatBox" ? "active" : ""}`}
          onClick={() => handleLinkClick("/chatBox")}
        >
          <MessageOutlined className="navpages-icon" style={{ fontSize: 30 }} />
        </Link>
        <Link
          to="/advice"
          className={`navpages-link ${activeLink === "/advice" || location.pathname === "/advice" ? "active" : ""}`}
          onClick={() => handleLinkClick("/advice")}
        >
          <SmartToyOutlined className="navpages-icon" style={{ fontSize: 30 }} />
        </Link>
      </div>
    </nav>
  );
};

export default NavPages;
