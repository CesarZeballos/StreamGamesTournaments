import Image from "next/image";
import logo from "../../app/assets/images/icons/logo.png"

const NavBar: React.FC = () => {
    return (
        <div className="bg-BGlight grid grid-cols-2 bodyContainer my-4">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-center items-center w-3/4 h-12"/>
        </div>
        <div className="flex justify-end gap-x-10">
            <button className="buttonSecondary">Tournaments</button>
            <button className="buttonSecondary">Teams</button>
            <button className="buttonSecondary">Sign In</button>
            <button className="buttonPrimary">Sign Up</button>
        </div>
        </div>
    )
}

export default NavBar;
