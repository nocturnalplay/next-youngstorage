import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { UsermenuContext } from "../../pages/dashboard";

const labs = [
  {
    text: "ubuntu",
    src: "ubuntu.jpg",
    disp: "coding lab",
  },
  {
    text: "kali",
    src: "kali.png",
    disp: "pentesting lab",
  },
];
export default function Lab() {
  const [selectLab, setSelectLab] = useState(null);
  const viewChanger = (e, value) => {
    setSelectLab(value);
  };
  return (
    <div className="dashboard-lab">
      {selectLab ? (
        <LabFunction {...{ lab: selectLab, event: viewChanger }} />
      ) : (
        <div className="lab-list">
          {labs.map((a) => (
            <Box key={a.text} {...a} event={viewChanger} />
          ))}
        </div>
      )}
    </div>
  );
}

//card design
function Box(props) {
  return (
    <div className="lab-list-box" id={props.text}>
      <header>
        <Image
          src={"/" + props.src}
          alt={props.text}
          height={310}
          width={450}
        />
      </header>
      <div>
        <h1>{props.text}</h1>
        <menu>{props.disp}</menu>
        <button onClick={(e) => props.event(e, props.text)}>start</button>
      </div>
    </div>
  );
}

//lab funciton design
function LabFunction(props) {
  const umenu = useContext(UsermenuContext);
  const data = labs.filter((a) => a.text === props.lab);
  let i = 0
  umenu.ws.current.onmessage = (e) => {
    const { event, msg } = JSON.parse(e.data)
    const dp = document.getElementById("deploy")
    const log = document.getElementById("log")
    switch (event) {
      case "deploy": {
        dp.innerHTML = "Deploying"
        break
      }
      case "deploy end": {
        dp.innerHTML = "Redeploy"
        break
      }
    }
    log.innerHTML += `<br />$ ${msg}`;
    autobottom();
  }
  //auto scroll height to bottom of the available
  const autobottom = () => {
    let log = document.getElementById("log");
    log.scrollTop = log.scrollHeight;
  };
  //deploy container for the user
  const deploy = () => {
    if (umenu.ws.current.readyState > 0) {
      umenu.ws.current.send(JSON.stringify({ event: "deploy", data: "1" }));
    } else {
      alert("Please check your Socket Connection");
    }
  };
  return (
    <div className="lab-function">
      <i
        className="lab-back"
        onClick={() => {
          props.event(null);
        }}
      >
        <Image src="/left.png" alt="left" width={30} height={30} />
      </i>
      <div className="lab-function-dashboard">
        <h1>{data[0].text}</h1>
        <Image
          src={`/` + data[0].src}
          alt={data[0].text}
          height={250}
          width={350}
        />
        <div className="lab-ip">
          <span>IP address</span>
          <span>127.0.0.1</span>
          <span>
            <b>
              <Image
                className="lab-ip-copy"
                src={`/copy.png`}
                alt="vscode"
                height={22}
                width={22}
              />
            </b>
          </span>
        </div>
        <div className="lab-function-button">
          <button id="d-status"><div className="pause"></div></button>
          <button id="deploy" onClick={deploy}>deploy</button>
          <button><Image
            className="lab-ip-copy"
            src={`/terminal.png`}
            alt="vscode"
            height={20}
            width={25}
          /></button>
          <button><Image
            className="lab-ip-copy"
            src={`/ssh-key.png`}
            alt="vscode"
            height={20}
            width={20}
          /></button>
        </div>
        <p>to connect our lab through vs code in web</p>
        <button className="lab-vscode">
          <Image src={`/vscode.png`} alt="vscode" height={20} width={20} />
          <b>VS code</b>
        </button>
      </div>
      <div className="lab-function-terminal" id="log">{"$"} welcome to youngstorage</div>
    </div>
  );
}
