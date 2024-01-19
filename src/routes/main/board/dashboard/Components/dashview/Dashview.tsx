import { useQuery } from "react-query";
import Header from "../../../../../../Components/Header";
import Top from "./Components/Top/Top";

import "./Dashview.css";
import axios from "axios";
import { endpoint, headers } from "../../../../../../constants";
import { ChartModel } from "./Components/Top/Components/ChartModel";
import { NotificationsList } from "./Components/Top/Components/NotificationsList";
const userId = localStorage.getItem("userId") || "";
export const Dashview = () => {
  const fetchEmployeeById = () => {
    return axios.get(`${endpoint}/api/users/${userId}`, { headers: headers });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["employee-infos"],
    queryFn: fetchEmployeeById,
  });

  return (
    <div className="dashview">
      <Header
        title="Welcome to VBS Alert"
        subtitle={`Hello ${
          !isLoading && data?.data.data.lastname
        } , welcome back!`}
      />
      <Top />
     
    </div>
  );
};
