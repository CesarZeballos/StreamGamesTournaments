import Image from "next/image";
import logo from "../../app/assets/images/icons/logo.png";

const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-BGdark grid grid-cols-[70%_30%] p-4">
        <Image
          src={logo}
          alt="Logo"
          className="flex justify-center items-center w-3/4 h-24 m-8"
        />
        <div className="flex flex-col justify-between items-start p-2 text-white text-xl gap-4 m-2">
          <button>Tournaments</button>
          <button>Teams</button>
          <button>Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Footer;
