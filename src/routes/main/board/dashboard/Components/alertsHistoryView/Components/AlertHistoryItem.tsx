import "./AlertHistoryItem.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import IMG from "../../../../../../../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { endpoint, headers } from "../../../../../../../constants";
import { useQuery } from "react-query";

interface AlertHistoryItemProps {
  username: string;
  userProfilUrl: string;
  companyId: number;
  alertType: string;
  alertStatus: string;
  time: string;
}
export const AlertHistoryItem = ({
  username,
  userProfilUrl,
  companyId,
  alertType,
  alertStatus,
  time,
}: AlertHistoryItemProps) => {
  const fetchCompanyById = () => {
    return axios.get(`${endpoint}/api/companies/${companyId}`, {
      headers: headers,
    });
  };
  const { data, isLoading } = useQuery({
    queryKey: ["company-by-id"],
    queryFn: fetchCompanyById,
  });
  const [companyName, setCompanyName] = useState<String>(
    !isLoading ? data?.data.data.companyName : ""
  );

  const formatDatetime = (timestamp: string) => {
    var date = new Date(timestamp);
    var heure = date.getHours();
    var minute = date.getMinutes();
    // Formater l'heure en format 12h
    var heureFormat12h = heure % 12 === 0 ? 12 : heure % 12;
    var suffixe = heure < 12 ? "AM" : "PM";
    // Construire la chaîne lisible
    var formatLisible =
      heureFormat12h + ":" + (minute < 10 ? "0" : "") + minute + " " + suffixe;

    return formatLisible;
  };
  return (
    <div className="alertHistoryItem">
      <div className="companyLogo">
        <img src={userProfilUrl} alt="" />
      </div>
      <div className="userInformation">
        <h3>{username}</h3>
        <p>{companyName}</p>
      </div>
      <div className="alertType">{alertType}</div>
      <div className="alertStatus">{alertStatus}</div>
      <div className="time">
        <h3>{formatDatetime(time)}</h3>
        <p>33 minutes ago</p>
      </div>

      <BsThreeDotsVertical size="20" />
    </div>
  );
};
