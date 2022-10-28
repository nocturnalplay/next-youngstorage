import { useEffect, useState } from "react";

export default function Message(props) {
  const { msg, success } = props;
  const [view, setview] = useState();
  useEffect(() => {
    setview(true);
  }, []);
//   const offview = () => {
//     setview(false);
//   };
  return (
    <>
      {view && (
        <div className={`alert ${success ? "success" : "error"}`}>
          {/* <b onClick={offview}>&times;</b> */}
          <span>{msg}</span>
        </div>
      )}
    </>
  );
}
