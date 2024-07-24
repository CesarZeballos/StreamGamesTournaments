import Image from "next/image";
import Link from "next/link";
import logo from "../../app/assets/images/icons/logo.png"

const NavBar: React.FC = () => {
    return (
        <div className="bg-BGlight grid grid-cols-2 bodyContainer my-4">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-center items-center w-3/4 h-12"/>
        </div>
        <div className="flex justify-end gap-x-10">
            <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
            <Link className="buttonSecondary" href="/teams">Teams</Link>
            <Link className="buttonSecondary" href="/signin">Sign In</Link>
            <Link className="buttonPrimary" href="/signup">Sign Up</Link>
        </div>
        </div>
    )
}

export default NavBar;
