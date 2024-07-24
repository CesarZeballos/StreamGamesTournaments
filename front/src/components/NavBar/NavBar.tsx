import Image from "next/image";
import Link from "next/link";
import logo from "../../app/assets/images/icons/logo.png"

const NavBar: React.FC = () => {
    return (
        <div className="bg-BGlight grid grid-cols-[40%_60%] bodyContainer mt-4 overflow-hidden">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-3/4 h-12"/>
        </div>
        <div className="flex justify-end gap-x-8 overflow-hidden p-1">
            <Link className="buttonSecondary" href="/">Home</Link>
            <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
            <Link className="buttonSecondary" href="/teams">Teams</Link>
            <Link className="buttonSecondary" href="/login">Sign In</Link>
            <Link className="buttonPrimary" href="/register">Sign Up</Link>
        </div>
        </div>
    )
}

export default NavBar;
