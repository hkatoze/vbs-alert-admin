import { useState } from "react";
import Header from "../../../../../../Components/Header";
import "./AlertsHistoryView.css";
import { AlertHistoryItem } from "./Components/AlertHistoryItem";
import axios from "axios";
import { endpoint, headers } from "../../../../../../constants";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import EMPTY_ICON from "../../../../../../assets/empty-icon.png";
export const AlertsHistosryView = () => {
  const [tabindex, setTab] = useState<number>(1);
  const fetchAllAlerts = () => {
    return axios.get(`${endpoint}/api/alerts`, { headers: headers });
  };
  const { data, isLoading } = useQuery({
    queryKey: ["all-alerts-list"],
    queryFn: fetchAllAlerts,
  });

  const changeTab = (tab: number) => {
    setTab(tab);
    console.log(tab);
  };

  const tabStyle = (tab: number) => {
    return {
      backgroundColor: tabindex === tab ? "#F0F0F0" : "white",
      color: tabindex === tab ? "black" : "hsl(240, 1%, 48%)",
    };
  };

  return (
    <div className="alertsHistoryView">
      <Header />
      <div className="title">
        <h2>Alerts history</h2>
      </div>
      <div className="content">
        <div className="tabs">
          <button style={tabStyle(1)} onClick={() => changeTab(1)}>
            Today
          </button>
          <button style={tabStyle(2)} onClick={() => changeTab(2)}>
            This month
          </button>
          <button style={tabStyle(3)} onClick={() => changeTab(3)}>
            All
          </button>
        </div>
        <div
          className="table"
          style={
            isLoading || data?.data.data.length == 0
              ? { alignItems: "center", justifyContent: "center" }
              : { alignItems: "start",justifyContent: "center" }
          }
        >
          {isLoading && (
            <ClipLoader
              color="hsl(210, 100%, 59%)"
              loading={isLoading}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
              data-testid="loader"
            />
          )}
          {data?.data.data.length == 0 && (
            <div
              className="emptyIcon"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className="empty" style={{ fontSize: "11px" }}>
                {tabindex === 1 && "No alerts today"}
                {tabindex === 2 && "No alerts this month"}
                {tabindex === 3 && "No alerts"}
              </h2>
              <img
                src={EMPTY_ICON}
                style={{ height: "13rem", width: "13rem" }}
                alt=""
              />
            </div>
          )}

          {data?.data.data.map(() => {
            <AlertHistoryItem />;
          })}
        </div>
      </div>
    </div>
  );
};
