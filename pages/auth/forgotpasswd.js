import { useState } from "react";
import Head from "next/head";
import Message from "../../components/alert";
import { Fetcher } from "../../api/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ForgotPasswd({ reftoken }) {
  const router = useRouter();
  const [data, setdata] = useState({
    passwd: "",
    cpasswd: "",
  });
  const [Alert, setAlert] = useState({
    msg: "",
    status: false,
    success: null,
  });
  const Handler = (e) => {
    setdata((a) => ({ ...a, [e.target.name]: e.target.value }));
  };
  const changeHandler = async () => {
    if (
      data.passwd != "" &&
      data.cpasswd != "" &&
      data.passwd === data.cpasswd
    ) {
      const fe = await Fetcher({
        path: "/changepasswd",
        method: "POST",
        body: { password: data.passwd, reftoken },
      });
      setAlert((a) => ({
        ...a,
        msg: fe.message,
        status: true,
        success: fe.status,
      }));
      //   if (fe.status) {
      //     setTimeout(() => {
      //       router.push("/auth/signin");
      //     }, 3000);
      //   }
      if (!fe.status) {
        setTimeout(() => {
          setAlert((a) => ({
            ...a,
            msg: "",
            status: false,
            success: null,
          }));
        }, 5000);
      }
    } else {
      setAlert((a) => ({
        ...a,
        msg: "password and confrim password not same or nil",
        status: true,
        success: false,
      }));
      setTimeout(() => {
        setAlert((a) => ({
          ...a,
          msg: "",
          status: false,
          success: null,
        }));
      }, 5000);
    }
  };
  return (
    <>
      <Head>
        <title>Youngstorage - Forgot Password</title>
      </Head>
      <div className="forgotpasswd">
        {Alert.status && !Alert.success && <Message {...Alert} />}
        {Alert.success ? (
          <>
            <lottie-player
              src="/verify.json"
              background="transparent"
              speed="1"
              autoplay
              id="verify-img"
            ></lottie-player>
            <div className="forgotpasswd-content">
              <span>Password Changer successfully</span>
              <span>
                to explore our services
                <Link href="/auth/signin">signin</Link>
              </span>
            </div>
          </>
        ) : (
          <header>
            <h1>forgot password</h1>
            <menu>
              <label>password</label>
              <input
                type="password"
                name="passwd"
                value={data.passwd}
                onChange={Handler}
              />
            </menu>
            <menu>
              <label>confirm password</label>
              <input
                type="password"
                name="cpasswd"
                value={data.cpasswd}
                onChange={Handler}
              />
            </menu>
            <button onClick={changeHandler}>submit</button>
          </header>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let reftoken = "";
  if (context.query.id) {
    reftoken = context.query.id;
  }
  return {
    props: { reftoken }, // will be passed to the page component as props
  };
}
