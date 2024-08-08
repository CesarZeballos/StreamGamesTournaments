'use client';
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg";
import { AppDispatch, RootState } from "@/redux/store";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setView } from "@/redux/slices/dashboardSlice";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    

    const routerToDashboard = (event: React.MouseEvent<HTMLButtonElement>) => {
        router.push("/dashboard");
        dispatch(setView("dashboard"));
        dispatch(reloadUserSlice({
            email: user?.email!,
            tokenFirebase: user?.tokenFirebase
        }))
    }

    const [not, setNot] = useState(0)
    useEffect(() => {
        if (user) {
            setNot(user?.receivedFriendRequests.length + user.tournaments.length)
        }
    }, [user])

    return (
        <div className="bg-BGlight grid grid-cols-4 px-large pt-4 pb-4 overflow-hidden">
        <div className="w-full flex justify-center">
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-fit h-16"/>
        </div>
        <div className="col-span-3 flex justify-end">
            <Link className="buttonNavbar" href="/">Home</Link>
            <Link className="buttonNavbar" href="/tournaments">Tournaments</Link>
            {user ? 
            <div className="flex gap-x-1 justify-end">
                <button className="buttonNavbar flex gap-2" onClick={routerToDashboard}><SportsEsportsIcon/>{`${user?.nickname}`}</button>
                {not > 0 && <p className="number text-white flex flex-row justify-end gap-1">{not} <NotificationsIcon/></p>}
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
