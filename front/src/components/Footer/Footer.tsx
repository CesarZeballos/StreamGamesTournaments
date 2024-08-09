'use client';
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

//icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Footer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  
  return (

      <div className="bg-BGdarkness flex flex-row gap-6 pt-14 pb-11 items-center justify-center">
        <Link className="buttonSecondary" href="/">Home</Link>
        <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
        <div className="flex flex-row gap-1">
          <p className="iconButton"><InstagramIcon/></p>
          <p className="iconButton"><FacebookIcon/></p>
          <p className="iconButton"><TwitterIcon/></p>
          <p className="iconButton"><EmailIcon/></p>
        </div>
      </div>
  );
};

export default Footer;
