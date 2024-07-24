import Image from "next/image";
import logo from "../../app/assets/images/icons/logo.png"

const NavBar: React.FC = () => {
    return (
        <div className="bg-BGlight grid grid-cols-2 p-4 m-2">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-center items-center w-3/4 h-12"/>
        </div>
        <div className="flex justify-end gap-10 text-white text-xl mr-12">
            <button>Tournaments</button>
            <button>Teams</button>
            <button>Sign In</button>
            <button className="bg-BGdark font-Raleway font-bold text-base text-white px-12 rounded-full">Sign Up</button>
        </div>
        </div>
    )
}

export default NavBar;
