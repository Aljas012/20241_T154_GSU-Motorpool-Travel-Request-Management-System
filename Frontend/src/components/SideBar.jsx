import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const SidebarComponent = ({
  requestModalShow,
  postModalShow,
  officeModalShow,
  driverModalShow,
  finalModalShow,
  guideModalShow,
}) => {



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
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346455/RequestIcon_f95ijn.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Requests
          </div>
        </MenuItem>
        <MenuItem className="menuItem" onClick={postModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346282/InspectionIcon_irudjw.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Inspection Checklist
          </div>
        </MenuItem>
        <MenuItem className="menuItem" onClick={officeModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346282/CodeIcon_rfswt6.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Office Code
          </div>
        </MenuItem>
        <MenuItem className="menuItem" onClick={driverModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346281/DriverIcon_xf1fpe.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Driver Info
          </div>
        </MenuItem>
        <MenuItem className="menuItem" onClick={finalModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346282/ApprovalIcon_uioh2w.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Approved
          </div>
        </MenuItem>
        <MenuItem className="menuItem" onClick={guideModalShow}>
          <div className="menuItemDiv">
            <img
              src="https://res.cloudinary.com/dx6ccf6ey/image/upload/v1732346281/GuideIcon_wwpwlr.svg"
              alt="icon"
              className="sidebarIconSize"
            />
            Admin Guide
          </div>
        </MenuItem>
       
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
