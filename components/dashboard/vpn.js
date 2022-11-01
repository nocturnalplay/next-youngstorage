import Image from "next/image";
export default function Vpn() {
  return (
    <div className="dashboard-vpn">
      <div className="vpn-container">
        <h1>
          private <b>VPN</b>
        </h1>
        <div className="vpn-content">
          <Image src="/vpn.png" alt="vpn" height={350} width={600} />
          <menu>
            <p>
              We are using a private connection for your container to access
              your container you must connected throught our VPN service.
            </p>
            <p>
              Either you can use our <b>QR code</b> or else <b>Download</b> the
              config file to setup.
            </p>
          </menu>
        </div>
      </div>
    </div>
  );
}
