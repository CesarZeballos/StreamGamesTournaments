import { IPropForm } from "@/interfaces/interfaceProps"

export const FormContainer = (props: IPropForm ) => {
    const {children, section} = props
    return (
        <div className="grid grid-cols-2">
            <h2 className="heading4 text-white">{section}</h2>
            <div className="flex flex-col gap-2">
                {children}
            </div>
        </div>
    )
}