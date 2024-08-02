'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "../../app/assets/images/icons/logo2.png";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { logoutSlice } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user.user);

    return (
        <div className="bg-BGlight grid grid-cols-[40%_60%] px-large  pt-4 pb-4 overflow-hidden">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-2/4 h-fit"/>
        </div>
        <div className="flex justify-end gap-x-1 overflow-hidden p-1">
            <Link className="buttonNavbar" href="/">Home</Link>
            <Link className="buttonNavbar" href="/tournaments">Tournaments</Link>
            {user ? 
            <div className="flex gap-x-8">
                <Link className="buttonNavbar flex gap-2" href="/dashboard"><SportsEsportsIcon/>{`${user?.nickname}`}</Link>
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
