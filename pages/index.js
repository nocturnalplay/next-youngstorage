import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { Fetcher } from "../api/fetcher";
import Footer from "../components/footer";

export default function Home() {
  //const [loading, setloading] = useState(true);
  const router = useRouter();
  // useEffect(() => {
  //   setloading(true);
  //   (async () => {
  //     const fe = await Fetcher({ path: "/checkuser", method: "GET" });
  //     if (fe.status) {
  //       router.push("/dashboard");
  //     }
  //   })();
  // }, []);
  return (
    <>
      <Head>
        <title>youngstorage</title>
      </Head>

      <div className="home-main">
        {/* home */}
        <div className="home child">
          <div className="home-lft">
            <h1>hii coders</h1>
            <b>Youngstorage</b>
            <span>the private lab</span>
            <p>
              have you ever explored the cloud space?
              <br /> right now this is the place where you can do a buch of
              stuff's in your private lab.
            </p>
            <p>
              <b>happy hacking!! &#128187;</b>
            </p>
            <Link href="/auth/signin">
              <button>get started</button>
            </Link>
            {/* <div className="signup-inp">
            <input type="email" placeholder="Email" />
            <button>verify</button>
          </div> */}
          </div>
          <div className="home-rht">
            <lottie-player
              src="/home.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              id="home-img"
            ></lottie-player>
          </div>
        </div>
        {/* service */}
        <div className="services-body child">
          <div className="services-sec" id="service">
            <div className="head">services</div>
            <div className="services-list">
              {imageList.map((a) => (
                <Box {...a} />
              ))}
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </>
  );
}

function Box(props) {
  return (
    <div className="service-list-box" id={props.text}>
      <header>
        <Image
          src={"/" + props.src}
          alt={props.text}
          height={props.text === "lab" ? 280 : 250}
          width={props.text === "lab" ? 280 : 250}
        />
      </header>
      <div>
        <h1>{props.text}</h1>
        <menu>{props.disp}</menu>
        <Link href={props.href}>
          <button>start</button>
        </Link>
      </div>
    </div>
  );
}
const imageList = [
  {
    src: "servicedb.png",
    text: "database",
    disp: "explore a lot with our different types of database services",
    href: "/services/database",
  },
  {
    src: "servicelab.png",
    text: "lab",
    disp: "explore a lot with our different types of linux distro",
    href: "/services/lab",
  },
  {
    src: "service VPN.png",
    text: "vpn",
    disp: "to access our services we created a VPN network",
    href: "/services/vpn",
  },
];
