import Link from "next/link";
import { useState } from "react";
import { Fetcher } from "../../api/fetcher";
import Message from "../../components/alert";

export default function Signin() {
  const [data, setdata] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [Alert, setAlert] = useState({
    msg: "",
    status: false,
    success: null,
  });
  const changeHandler = (e) => {
    setdata((a) => ({ ...a, [e.target.name]: e.target.value }));
  };
  const signup = async () => {
    const fe = await Fetcher({ path: "/signup", method: "POST", body: data });
    setAlert((a) => ({
      ...a,
      msg: fe.message,
      status: true,
      success: fe.status,
    }));
    if (fe.status) {
      setdata((a) => ({ ...a, username: "", password: "", email: "" }));
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
    <div className="signup-auth">
      {Alert.status && <Message {...Alert} />}
      <div className="signup-body">
        {/* <header>
          <b>
            welcome to <span>youngstorage</span>
          </b>
          <span>the private lab</span>
          <p>
            have you ever explored the cloud space?
            <br /> right now this is the place where you can do a buch of
            stuff's in your private lab.
          </p>
          <p>
            explore the lab just by <span>verify your email</span>
          </p>
        </header> */}
        <menu className="signup-form">
          <div className="signup-body">
            <div className="signin-body-header">sign up</div>
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
                  name="password"
                  onChange={changeHandler}
                  value={data.password}
                />
              </div>
              <div className="sign-grp">
                <label>email</label>
                <input
                  type="email"
                  value={data.email}
                  name="email"
                  onChange={changeHandler}
                />
              </div>
              <button onClick={signup}>submit</button>
            </menu>
            <div className="signup-body-footer">
              <span>
                already have an account?
                <Link href="/auth/signin">
                  <b> sign in</b>
                </Link>
              </span>
            </div>
          </div>
        </menu>
      </div>
    </div>
  );
}
