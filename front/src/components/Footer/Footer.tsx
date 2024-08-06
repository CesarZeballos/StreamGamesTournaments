'use client';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const Footer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return (

      <div className="bg-BGdarkness flex flex-row gap-6 pt-14 pb-11 items-center justify-center">
        <Link className="buttonSecondary" href="/">Home</Link>
        <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
        {user ? 
        <div className="flex gap-x-8">
            <Link className="buttonSecondary flex gap-2" href="/dashboard"><SportsEsportsIcon/>{`${user?.nickname}`}</Link>
        </div>
        :
        <div className="flex gap-x-8">
            <Link className="buttonSecondary" href="/login">Sign In</Link>
            <Link className="buttonSecondary text-base" href="/register">Sign Up</Link>
        </div>
        }
      </div>
  );
};

export default Footer;
