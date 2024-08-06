import { IPropForm } from "@/interfaces/interfaceProps"
import Image from "next/image"
import tournBanner from "@/app/assets/images/banners/TournBanner.jpg";

export const PostContainer: React.FC<IPropForm> = ({ children, section, image }) => {
    return (
      <div className="grid grid-cols-[40%_5%_40%_5%] gap-x-6 min-h-screen">
        <div className="col-span-1 flex flex-col justify-start items-center">
          <h2 className="mb-4 heading4 text-white">{section}</h2>
          <Image
            src={image || tournBanner} 
            alt="Tournament Banner"
            className="border-lightViolet border-4 rounded-lg"
            width={500}
            height={500}
          />
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1 flex flex-col gap-12">{children}</div>
        <div className="col-span-1"></div>
      </div>
    );
  };
