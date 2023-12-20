import Header from "../../../../Components/Header";
import Top from "./Components/Top/Top";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header
        title="Welcome to VBS Alert"
        subtitle="Hello kinda,welcome back!"
      />
      <Top />
    </div>
  );
};

export default Dashboard;
