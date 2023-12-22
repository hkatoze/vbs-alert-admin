import { FunctionComponent, useState } from "react";
import "./Sidebar.css";
import { IoMdSpeedometer } from "react-icons/io";

import { CiBank } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import MenuListTemplate from "./Components/MenuListTemplate";
import MenuListItem from "./Components/MenuListItem";
import SidebarCard from "./Components/SidebarCard";
import Logo from "./Components/Logo";

const Sidebar: FunctionComponent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number>(1);
  return (
    <div className="sideBar grid">
      <Logo />
      <MenuListTemplate headding="QUICK MENU">
        <MenuListItem
          icon={<IoMdSpeedometer className="icon" />}
          link="/mainpage/dashboard/dashview"
          isSelected={selectedMenuItem === 1}
          onClick={() => setSelectedMenuItem(1)}
        >
          Dash board
        </MenuListItem>

        <MenuListItem
          icon={<CiBank className="icon" />}
          link="/mainpage/companiesboard"
          isSelected={selectedMenuItem === 2}
          onClick={() => setSelectedMenuItem(2)}
        >
          Companies
        </MenuListItem>
      </MenuListTemplate>
      <MenuListTemplate headding="SETTINGS">
        <MenuListItem
          icon={<CgProfile className="icon" />}
          link="/mainpage/profilboard"
          isSelected={selectedMenuItem === 3}
          onClick={() => setSelectedMenuItem(3)}
        >
          Profil
        </MenuListItem>
        <MenuListItem
          icon={null}
          link="#"
          isSelected={selectedMenuItem === 4}
          onClick={() => setSelectedMenuItem(4)}
        >
          {" "}
        </MenuListItem>
      </MenuListTemplate>
      <SidebarCard link="/mainpage/helpboard" />
    </div>
  );
};

export default Sidebar;
