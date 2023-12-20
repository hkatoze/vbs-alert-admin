import IMG2 from "../../../../../../../assets/illustration.png";
import { BsArrowRightShort } from "react-icons/bs";

import "./RightBlock.css";
import SidebarCard from "../../../../../Sidebar/Components/SidebarCard";

const RightBlock = () => {
  return (
    <div className="rightBlock flex">
      <div className="main flex">
        <div className="textDiv">
          <h1>My Stats</h1>
          <div className="flex">
            <span>
              Today <br /> <small>4 Orders</small>
            </span>
            <span>
              This Month <br /> <small>127 Orders</small>
            </span>
          </div>
          <span className="flex link">
            Go to my orders <BsArrowRightShort className="icon" />
          </span>
        </div>
        <div className="imgDiv">
          <img src={IMG2} alt="Image name" />
        </div>
      </div>
      <SidebarCard link="/mainpage/helpboard" />
    </div>
  );
};

export default RightBlock;
