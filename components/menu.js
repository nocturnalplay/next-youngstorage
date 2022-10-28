import Image from "next/image";
import Link from "next/link";
export default function Menu() {
  return (
    <div className="menu">
      <div className="menu-logo">
        <Link href="/">
          <div>
            <Image src="/logo.png" alt="logo" height={40} width={40} />
            <span>youngstorage</span>
            <b>beta</b>
          </div>
        </Link>
      </div>
      <div className="menu-li">
        {/* <Link href="/">
          <span>Home</span>
        </Link>
        <Link href="/services">
          <span>Services</span>
        </Link>
        <Link href="/services/database">
          <span>Database</span>
        </Link>
        <Link href="/services/lab">
          <span>Labs</span>
        </Link>
        <Link href="/services/vpn">
          <span>VPN</span>
        </Link> */}
        <Link href="/auth/signin">
          <span id="signin">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
