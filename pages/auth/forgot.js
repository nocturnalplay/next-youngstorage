export default function Forgot() {
  return (
    <div className="forgot-passwd">
      <h1>youngstorage</h1>
      <p>please verify your email to change the password</p>
      <div className="forgot-form">
        <input type="email" placeholder="Email" />
        <button>verify</button>
      </div>
    </div>
  );
}
