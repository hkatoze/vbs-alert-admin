import { FunctionComponent } from "react";
import "./Sidebar.css";
import { IoMdSpeedometer } from "react-icons/io";

import { CiBank } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import MenuListTemplate from "./Components/MenuListTemplate";
import MenuListItem from "./Components/MenuListItem";
import SidebarCard from "./Components/SidebarCard";
import Logo from "./Components/Logo";

const Sidebar: FunctionComponent = () => {
  return (
    <div className="sideBar grid">
      <Logo />
      <MenuListTemplate headding="QUICK MENU">
        <MenuListItem
          icon={<IoMdSpeedometer className="icon" />}
          link="/mainpage/dashboard"
        >
          Dash board
        </MenuListItem>

        <MenuListItem
          icon={<CiBank className="icon" />}
          link="/mainpage/companiesboard"
        >
          Companies
        </MenuListItem>
      </MenuListTemplate>
      <MenuListTemplate headding="SETTINGS">
        <MenuListItem
          icon={<CgProfile className="icon" />}
          link="/mainpage/profilboard"
        >
          Profil
        </MenuListItem>
        <MenuListItem icon={null} link="#">
          {" "}
        </MenuListItem>
      </MenuListTemplate>
      <SidebarCard link="/mainpage/helpboard" />
    </div>
  );
};

export default Sidebar;
