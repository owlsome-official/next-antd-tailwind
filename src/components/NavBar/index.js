import { CaretDownOutlined } from "@ant-design/icons";
import { theme } from "antd";
import logoSrc from "assets/images/logo200.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = ({ className }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const router = useRouter();

  const LoggedInAs = "Alice Wonder";
  const handleClickHome = () => {
    router.push("/");
  };
  const handleClickSignIn = () => {
    console.log("Clicked Sign In");
  };
  const handleClickSignOut = () => {
    console.log("Clicked Sign Out");
  };

  return (
    <div
      className={`h-16 flex justify-between items-center px-10 ${className}`}
      style={{
        backgroundColor: colorPrimary,
      }}
    >
      <div
        className="flex gap-8 font-bold text-h5 select-none cursor-pointer items-center"
        onClick={handleClickHome}
      >
        <div>
          <Image src={logoSrc} height="50" />
        </div>
        <div>REPLACE_WITH_YOUR_PROJECT_NAME</div>

        {/* REMOVABLE */}
        <Link href="/after_installation" className="border border-red-600 px-6">
          AFTER INSTALLATION!
        </Link>
        {/* REMOVABLE */}
      </div>
      <div>
        {LoggedInAs ? (
          <ShowCurrentUser name={LoggedInAs} onClick={handleClickSignOut} />
        ) : (
          <button onClick={handleClickSignIn}>test</button>
        )}
      </div>
    </div>
  );
};

const ShowCurrentUser = ({ name, onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div
      className="flex gap-2 text-h5 select-none cursor-pointer"
      onClick={handleClick}
    >
      <div>Welcome, {name}</div>
      <CaretDownOutlined />
    </div>
  );
};

export default NavBar;
