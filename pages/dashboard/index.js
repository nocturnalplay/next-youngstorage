import { useState, createContext, useRef, useEffect } from "react";
import { DashboardUserMenu, DashboardMenu } from "../../components/menu";
import Home from "../../components/dashboard/home";
import Vpn from "../../components/dashboard/vpn";
import Database from "../../components/dashboard/database";
import Lab from "../../components/dashboard/lab";

export const UsermenuContext = createContext();

export default function Dashboard() {
  const [usermenu, setusermenu] = useState("home");
  const ws = useRef()
  //inilized the websocket from the client
  useEffect(() => {
    return () => {
      ws.current = new WebSocket(`${process.env.WS}`)
    }
  }, [])
  return (
    <UsermenuContext.Provider value={{ usermenu, setusermenu, ws }}>
      <div className="dashboard">
        <DashboardMenu />
        <DashboardUserMenu />
        {usermenu === "home" && <Home />}
        {usermenu === "lab" && <Lab />}
        {usermenu === "vpn" && <Vpn />}
        {usermenu === "database" && <Database />}
      </div>
    </UsermenuContext.Provider>
  );
}
