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

    const logout = () => {
        dispatch(logoutSlice())
        setTimeout(() => {
            router.push("/")
        }, 1500);
    }

    return (
        <div className="bg-BGlight grid grid-cols-[40%_60%] bodyContainer mt-4 overflow-hidden">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-2/4 h-fit"/>
        </div>
        <div className="flex justify-end gap-x-8 overflow-hidden p-1">
            <Link className="buttonSecondary" href="/">Home</Link>
            <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
            {user ? 
            <div className="flex gap-x-8">
                <Link className="buttonSecondary flex gap-2" href="/dashboard"><SportsEsportsIcon/>{`${user.nickName}`}</Link>
                <button className="buttonSecondary" onClick={logout}>Sign Out</button>
            </div>
            :
            <div className="flex gap-x-8">
                <Link className="buttonSecondary" href="/login">Sign In</Link>
                <Link className="buttonPrimary" href="/register">Sign Up</Link>
            </div>
            }
        </div>
        </div>
    )
}

export default NavBar;
