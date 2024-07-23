import { IPropContainer } from "@/interfaces/interfaceProps";

export const FourColumsContainer = (props: IPropContainer ) => {
    const {children} = props

    return (
        <div className="grid grid-cols-4 gap-x-6">
            {children}
        </div>
    );
};