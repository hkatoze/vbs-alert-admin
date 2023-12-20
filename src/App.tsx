import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode, useState } from "react";
import Mainpage from "./routes/main/Mainpage";
import Login from "./routes/login/Login";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

const userSession = localStorage.getItem("user") || "disconnected";
const App = () => {
  const [session, setSession] = useState<string>(userSession);
  const client = new QueryClient();
  const location = useLocation();

  return (
    <QueryClientProvider client={client}>
      <div className="app">
        {session === "connected" && location.pathname === "/" ? (
          <Mainpage />
        ) : location.pathname != "/" ? (
          <Outlet />
        ) : (
          <Login />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
