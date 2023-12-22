import IMG2 from "../../../../../../../assets/illustration.png";
import { BsArrowRightShort } from "react-icons/bs";

import "./RightBlock.css";
import SidebarCard from "../../../../../Sidebar/Components/SidebarCard";
import { Link } from "react-router-dom";

const RightBlock = () => {
  return (
    <div className="rightBlock flex">
      <div className="main flex">
        <div className="textDiv">
          <h1>Our Stats</h1>
          <div className="flex">
            <span>
              Today <br /> <small>4 alerts</small>
            </span>
            <span>
              This Month <br /> <small>127 alerts</small>
            </span>
          </div>
          <Link to="/mainpage/dashboard/alertsHistory" className="flex link">
            <span >
              Go to alerts history
              <BsArrowRightShort className="icon" />
            </span>
          </Link>
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
