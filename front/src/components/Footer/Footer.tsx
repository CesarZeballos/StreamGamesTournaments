'use client';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Footer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return (

      <div className="bg-BGdark flex flex-row gap-6 my-9 items-center justify-center">
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
  );
};

export default Footer;
