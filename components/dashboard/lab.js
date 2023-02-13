import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { UsermenuContext } from "../../pages/dashboard";

const labs = [
  {
    text: "ubuntu",
    src: "ubuntu-logo.png",
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
  console.log("parent",selectLab)
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
  const [docker, setDocker] = useState({
    dockerip: "",
    dockerwgip: "",
    sshpassword: "",
    sshusername: "",
    userip: "",
    _id: "",
  })
  let i = 0
  useEffect(() => {
    return () => {
      console.log(props.lab)
      if (props.lab != null) {
        if (umenu.ws.current.readyState > 0) {
          umenu.ws.current.send(JSON.stringify({ event: "labdetail" }));
        } else {
          alert("Please check your Socket Connection");
        }
      }
    }
  }, [])
  umenu.ws.current.onmessage = (e) => {
    const { event, msg } = JSON.parse(e.data)
    const dp = document.getElementById("deploy")
    const log = document.getElementById("log")
    switch (event) {
      case "deploy": {
        dp.innerHTML = "Deploying"
        log.innerHTML += `<br />$ ${msg}`;
        break
      }
      case "deploy-end": {
        dp.innerHTML = "Redeploy"
        log.innerHTML += `<br />$ ${msg}`;
        break
      }
      case "labdetail": {
        log.innerHTML += `<br />$ ${msg._id}`;
        setDocker(() => msg)
        console.log(msg)
        break
      }
    }
    autobottom();
  }
  //copy to clipboard
  const copyClipBoard = () => {
    var cp = document.getElementById("dockerwgip").innerHTML
    // cp.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    try {
      navigator.clipboard.writeText(cp);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
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
          height={100}
          width={100}
        />
        <div className="lab-ip">
          <span>IP address</span>
          <span id="dockerwgip">{docker.dockerwgip ? docker.dockerwgip : "plese deploy your lab"}</span>
          <span onClick={copyClipBoard} >
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
