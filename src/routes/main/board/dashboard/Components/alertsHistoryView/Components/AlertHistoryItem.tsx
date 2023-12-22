import "./AlertHistoryItem.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import IMG from "../../../../../../../assets/logo.png";
export const AlertHistoryItem = () => {
  return (
    <div className="alertHistoryItem">
      <div className="companyLogo">
        <img src={IMG} alt="" />
      </div>
      <div className="userInformation">
        <h3>Alex Zoungrana</h3>
        <p>Company IT</p>
      </div>
      <div className="alertType">NEED HELP</div>
      <div className="alertStatus">RESCUED</div>
      <div className="time">
        <h3>May 08, 11:51</h3>
        <p>33 minutes ago</p>
      </div>

      <BsThreeDotsVertical size="20" />
    </div>
  );
};
