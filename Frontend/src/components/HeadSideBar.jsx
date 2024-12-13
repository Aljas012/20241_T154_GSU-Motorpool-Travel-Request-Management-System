import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const HeadSidebarComponent = ({ requestModalShow }) => {
  return (
    <Sidebar className="sidebarBG">
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "1.5rem",
            padding: "2rem",
            borderBottom: "1px solid #00000026",
          }}
        >
          <img
            src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732112644/GSU/gapvdhuavbpym2y6rhvv.svg"
            alt="icon"
            className="sidebarIconSize1"
          />
          <h5 className="customFont">Dashboard</h5>
        </div>

        <div>
          <h6
            className="customFont lineBorder"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Home
          </h6>
        </div>
      </div>
      <Menu
        menuItemStyles={{
          label: {
            fontFamily: "Helvetica", // Change to your desired font
            fontSize: "16px",
          },
        }}
      >
        <MenuItem className="menuItem" onClick={requestModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1733491806/CheckIcon_og5iow.png"
              alt="icon"
              className="sidebarIconSize"
            />
            Final Approval{" "}
          </div>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default HeadSidebarComponent;
