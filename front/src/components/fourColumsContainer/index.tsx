import { IPropContainer } from "@/interfaces/interfaceProps";
import Image from "next/image";

export const FourColumsContainer = (props: IPropContainer ) => {
    const {children, imagen, URLimagen} = props

    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="col-span-3 flex flex-col gap-12">
                {children}
            </div>
            <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                <Image className="w-full h-full object-cover" width={500} height={500} src={URLimagen} alt={imagen} />
            </div>
        </div>
    );
};