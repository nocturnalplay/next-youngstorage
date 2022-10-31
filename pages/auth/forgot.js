import { useState } from "react";
import { Fetcher } from "../../api/fetcher";
import Message from "../../components/alert";

export default function Forgot() {
  const [email, setemail] = useState("");
  const [Alert, setAlert] = useState({
    msg: "",
    status: false,
    success: null,
  });
  const checkHandler = async () => {
    const fe = await Fetcher({
      path: "/mailverify",
      method: "POST",
      body: { email },
    });
    setAlert((a) => ({
      ...a,
      msg: fe.message,
      status: true,
      success: fe.status,
    }));

    //if email not in the list this will happen
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
  };
  return (
    <div className="forgot-passwd">
      {Alert.status && !Alert.success && <Message {...Alert} />}
      {Alert.success ? (
        <header>
          <lottie-player
            src="/mail.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            id="mail-img"
          ></lottie-player>
          <span>{Alert.msg}</span>
        </header>
      ) : (
        <>
          <h1>youngstorage</h1>
          <p>please verify your email to change the password</p>
          <div className="forgot-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <button onClick={checkHandler}>verify</button>
          </div>
        </>
      )}
    </div>
  );
}
