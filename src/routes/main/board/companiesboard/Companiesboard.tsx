import { Outlet, useLocation } from "react-router-dom";
import "./Companiesboard.css";
import CompaniesListView from "./companiesListView/CompaniesListView";

const Companiesboard = () => {
  const location = useLocation();

  return (
    <div className="companiesboard">
      {location.pathname === "/mainpage/companiesboard" ? (
        <CompaniesListView />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Companiesboard;
