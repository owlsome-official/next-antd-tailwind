import { CaretDownOutlined } from "@ant-design/icons";
import logoSrc from "assets/images/logo200.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = ({ className }) => {
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
      className={`bg-accent text-primary flex h-16 items-center justify-between px-10 ${className}`}
    >
      <div
        className="text-h5 flex cursor-pointer items-center gap-8 font-bold select-none"
        onClick={handleClickHome}
      >
        <div className="flex items-center">
          <Image src={logoSrc} height="50" alt="logo" />
        </div>
        <div>REPLACE_WITH_YOUR_PROJECT_NAME</div>

        {/* REMOVABLE */}
        <Link
          href="/after_installation"
          className="border-primary/30 text-small hover:bg-primary/10 rounded-md border px-6 py-1 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
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
      className="text-h5 flex cursor-pointer gap-2 select-none"
      onClick={handleClick}
    >
      <div>Welcome, {name}</div>
      <CaretDownOutlined />
    </div>
  );
};

export default NavBar;
