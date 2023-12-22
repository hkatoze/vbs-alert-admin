import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Errorpage from "./routes/Errorpage";

import App from "./App";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import Mainpage from "./routes/main/Mainpage";
import Dashboard from "./routes/main/board/dashboard/Dashboard";
import Companiesboard from "./routes/main/board/companiesboard/Companiesboard";
import Profilboard from "./routes/main/board/profilboard/Profilboard";
import Helpboard from "./routes/main/board/helpboard/Helpboard";
import CompaniesListView from "./routes/main/board/companiesboard/companiesListView/CompaniesListView";
import CompanyView from "./routes/main/board/companiesboard/companyView/CompanyView";
import AddCompanyView from "./routes/main/board/companiesboard/addCompanyView/AddCompanyView";
import { EditCompanyView } from "./routes/main/board/companiesboard/editCompanyView/EditCompanyView";
import AddEmployeeView from "./routes/main/board/companiesboard/companiesListView/Components/AddEmployeeView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Errorpage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "mainpage",
        element: <Mainpage />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "alertsHistory", element: <div>Burkina</div> },
            ],
          },
          {
            path: "companiesboard",
            element: <Companiesboard />,
            children: [
              { path: "companiesListView", element: <CompaniesListView /> },
              {
                path: "companiesListView/:companyId",
                element: <CompanyView />,
              },
              {
                path: "addCompany",
                element: <AddCompanyView />,
              },
              {
                path: "addEmployee/:companyId",
                element: <AddEmployeeView />,
              },

              {
                path: "editCompany/:companyId",
                element: <EditCompanyView />,
              },
            ],
          },
          { path: "profilboard", element: <Profilboard /> },
          { path: "helpboard", element: <Helpboard /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
