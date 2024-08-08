'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";
import { RootState } from "@/redux/store";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSelector } from "react-redux";

const NavBar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <div className="bg-BGlight grid grid-cols-4 px-large pt-4 pb-4 overflow-hidden">
        <div className="w-full flex justify-center">
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-fit h-16"/>
        </div>
        <div className="col-span-3 flex justify-end">
            <Link className="buttonNavbar" href="/">Home</Link>
            <Link className="buttonNavbar" href="/tournaments">Tournaments</Link>
            {user ? 
            <div className="flex gap-x-8">
<<<<<<< HEAD
                <Link className="buttonNavbar flex gap-2" href="/dashboard"><SportsEsportsIcon/>{`${user?.nickname}`}</Link>
=======
                <Link className="buttonSecondary flex gap-2" href="/dashboard"><SportsEsportsIcon/>{`${user?.nickName}`}</Link>
                <button className="buttonSecondary" onClick={logout}>Sign Out</button> 
>>>>>>> origin/cesar
            </div>
            :
            <div className="flex gap-x-8">
                <Link className="buttonNavbar" href="/login">Sign In</Link>
                <Link className="buttonPrimary text-base" href="/register">Sign Up</Link>
            </div>
            }
        </div>
        </div>
    )
}

export default NavBar;
