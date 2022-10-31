import Message from "../../components/alert";
import { useEffect, useState } from "react";
import { Fetcher } from "../../api/fetcher";
import { useRouter } from "next/router";

export default function Otpverify({ userid }) {
  const router = useRouter();
  const [data, setdata] = useState("");
  const [Alert, setAlert] = useState({
    msg: "",
    status: false,
    success: null,
  });
  const changeHandler = (e) => {
    setdata((a) => e.target.value);
  };
  const otpverify = async () => {
    const fe = await Fetcher({
      path: "/otpverify",
      method: "POST",
      body: {
        userid,
        otp: parseInt(data),
      },
    });
    if (fe.status) {
      setdata("");
      document.cookie = `token=${fe.data};path=/`;
      router.push(`/dashboard`);
    }
    setAlert((a) => ({
      ...a,
      msg: fe.message,
      status: true,
      success: fe.status,
    }));
    setdata("");
    setTimeout(() => {
      setAlert((a) => ({
        ...a,
        msg: "",
        status: false,
        success: null,
      }));
    }, 5000);
  };
  const resendotp = async (e) => {
    settime(120);
    const fe = await Fetcher({
      path: "/otpresend",
      method: "POST",
      body: {
        userid,
      },
    });
  };
  const [time, settime] = useState(120);
  useEffect(() => {
    let it = setInterval(() => settime(time - 1), 1000);
    if (time <= 0) {
      return clearInterval(it);
    }
    return () => clearInterval(it);
  }, [time]);
  return (
    <div className="forgot-passwd">
      {Alert.status && <Message {...Alert} />}
      <h1>youngstorage</h1>
      <p>please enter your OTP</p>
      <div className="forgot-form">
        <input
          type="number"
          placeholder="OTP"
          value={data}
          name="otp"
          onChange={changeHandler}
        />
        <button onClick={otpverify}>verify</button>
      </div>
      <div className="reminder">
        <span>
          you have remaining
          <b className={time < 30 ? "finish" : "rem"}>{time}</b> sec
        </span>
        <button
          disabled={time === 0 ? false : true}
          type="button"
          onClick={resendotp}
          className={time === 0 ? "active" : "disable"}
        >
          resend
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  let id = "";
  if (context.query.id) {
    id = context.query.id;
  }
  return {
    props: { userid: id }, // will be passed to the page component as props
  };
}
