import { Outlet } from "react-router-dom";
import Header from "../../../../Components/Header";
import Top from "./Components/Top/Top";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {location.pathname === "/mainpage/dashboard" ? (
        <div>
          <Header
            title="Welcome to VBS Alert"
            subtitle="Hello kinda,welcome back!"
          />
          <Top />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Dashboard;
