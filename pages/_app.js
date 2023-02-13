import "../styles/globals.scss";
import Menu from "../components/menu";
import { StrictMode, useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [menustate, setstate] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    console.log("_app happens");
    setloading(true);
    let path = window.location.pathname.split("/");
    // if (path[1] === "auth" || path[1] === "" || path[1] === "dashboard") {
    //   Promise.all([
    //     fetch(`${process.env.API}/checkuser`, {
    //       method: "GET",
    //       credentials: "include",
    //     }),
    //   ])
    //     .then((res) => Promise.all(res.map((r) => r.json())))
    //     .then((res) => {
    //       if (res[0].status) {
    //         router.push("/dashboard");
    //       }
    //     });
    // }
    if (path[1] === "auth" || path[1] === "dashboard") {
      setstate(true);
    } else {
      setstate(false);
    }
    setloading(false);
  }, [Component]);

  return (
    <StrictMode>
      {loading ? (
        "loading.."
      ) : (
        <div className="body">
          {!menustate && <Menu />}
          <Component {...pageProps} />
          {/* {menustate && <Footer />} */}
        </div>
      )}
    </StrictMode>
  );
}

export default MyApp;
