import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UsermenuContext } from "../pages/dashboard";
import Tooltip from "../components/tooltip";
import { Fetcher } from "../api/fetcher";

export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-logo">
        <Link href="/">
          <div>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            <span>youngstorage</span>
            <b>beta</b>
          </div>
        </Link>
      </div>
      <div className="menu-li">
        {/* <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/services">
          <span>Services</span>
        </Link>
        <Link href="/services/database">
          <span>Database</span>
        </Link>
        <Link href="/services/lab">
          <span>Labs</span>
        </Link>
        <Link href="/services/vpn">
          <span>VPN</span>
        </Link> */}
        <Link href="/auth/signin">
          <span id="signin">Sign in</span>
        </Link>
        <Link href="/auth/signup">
          <span id="signup">Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export const DashboardUserMenu = () => {
  const umenu = useContext(UsermenuContext);
  const Selecthandler = (e, value) => {
    umenu.setusermenu(value);
  };
  console.log(umenu.usermenu);
  return (
    <div className="dashboard-user-menu">
      <menu>
        <span
          className={
            umenu.usermenu === "home"
              ? "user-menu-icon active"
              : `user-menu-icon`
          }
          onClick={(e) => Selecthandler(e, "home")}
        >
          <Tooltip {...{ text: "home" }} />
          <Image src="/user-home.png" alt="home" width={30} height={30} />
          <b>home</b>
        </span>
        <span
          className={
            umenu.usermenu === "lab"
              ? "user-menu-icon active"
              : `user-menu-icon`
          }
          onClick={(e) => Selecthandler(e, "lab")}
        >
          <Tooltip {...{ text: "lab" }} />
          <Image
            src="/user-lab.png"
            style={{ transform: "rotate(90deg)" }}
            alt="lab"
            width={30}
            height={30}
          />
          <b>lab</b>
        </span>
        <span
          className={
            umenu.usermenu === "vpn"
              ? "user-menu-icon active"
              : `user-menu-icon`
          }
          onClick={(e) => Selecthandler(e, "vpn")}
        >
          <Tooltip {...{ text: "vpn" }} />
          <Image src="/user-vpn.png" alt="vpn" width={30} height={30} />
          <b>VPN</b>
        </span>
        <span
          className={
            umenu.usermenu === "database"
              ? "user-menu-icon active"
              : `user-menu-icon`
          }
          onClick={(e) => Selecthandler(e, "database")}
        >
          <Tooltip {...{ text: "database" }} />
          <Image
            src="/user-database.png"
            alt="database"
            width={30}
            height={30}
          />
          <b>database</b>
        </span>
        <span
          className={
            umenu.usermenu === "menu"
              ? "user-menu-icon active"
              : `user-menu-icon`
          }
          onClick={(e) => Selecthandler(e, "menu")}
        >
          <Tooltip {...{ text: "menu" }} />
          <Image src="/user-menu.png" alt="menu" width={30} height={30} />
          <b>menu</b>
        </span>
      </menu>
    </div>
  );
};

export const DashboardMenu = () => {
  const [udetails, setUdetails] = useState(false);
  const [username, setusername] = useState("");
  const [loading, setloading] = useState(true);

  const Userdetails = async () => {
    setUdetails((a) => !a);
    setloading(true);
    if (!udetails) {
      const fe = await Fetcher({
        path: `/checkuser?token=${document.cookie.split("=")[1]}`,
        method: "GET",
      });
      if (fe.status) {
        setusername(fe.data);
      }
    }
    setloading(false);
  };
  const Logout = async () => {
    const fe = await Fetcher({ path: "/signout", method: "GET", });
    console.log(fe);
  };
  return (
    <div className="dashboard-menu">
      <div className="dashboard-menu-logo">
        <Image src="/logo.png" alt="logo" height={35} width={35} />
        <span>youngstorage</span>
      </div>
      <div className="dashboard-menu-user">
        {udetails &&
          (loading ? (
            <div className="dashboard-user-datails">loading...</div>
          ) : (
            <div className="dashboard-user-datails">
              <span>{username}</span>
              <span>setting</span>
              <span onClick={Logout}>logout</span>
            </div>
          ))}
        <Image
          src="/user.png"
          alt="logo"
          height={30}
          width={30}
          onClick={Userdetails}
        />
      </div>
    </div>
  );
};
