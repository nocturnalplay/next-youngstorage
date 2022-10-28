import Link from "next/link";
import { useState } from "react";
import { Fetcher } from "../../api/fetcher";
import Message from "../../components/alert";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const [data, setdata] = useState({
    username: "",
    password: "",
  });
  const [Alert, setAlert] = useState({
    msg: "",
    status: false,
    success: null,
  });
  const changeHandler = (e) => {
    setdata((a) => ({ ...a, [e.target.name]: e.target.value }));
  };
  const signin = async () => {
    const fe = await Fetcher({ path: "/signin", method: "POST", body: data });
    setAlert((a) => ({
      ...a,
      msg: fe.message,
      status: true,
      success: fe.status,
    }));
    if (fe.status) {
      setdata((a) => ({ ...a, username: "", password: "", email: "" }));
      router.push(`/auth/otpverify?id=${fe.data}`);
    }
    setTimeout(() => {
      setAlert((a) => ({
        ...a,
        msg: "",
        status: false,
        success: null,
      }));
    }, 5000);
  };
  return (
    <div className="auth">
      {Alert.status && <Message {...Alert} />}
      {/* <h1>
        <span>youngstorage</span> auth
      </h1> */}
      <div className="signin-body">
        <header>sign in</header>
        <menu>
          <div className="sign-grp">
            <label>username</label>
            <input
              type="text"
              value={data.username}
              name="username"
              onChange={changeHandler}
            />
          </div>
          <div className="sign-grp">
            <label>password</label>
            <input
              type="password"
              value={data.password}
              name="password"
              onChange={changeHandler}
            />
          </div>
          <button onClick={signin}>submit</button>
        </menu>
        <footer>
          <span>
            create new account?
            <Link href="/auth/signup">
              <b> sign up</b>
            </Link>
          </span>
          <Link href="/auth/forgot">
            <span>forgot password?</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
