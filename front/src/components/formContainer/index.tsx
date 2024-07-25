import { IPropForm } from "@/interfaces/interfaceProps"

export const FormContainer = (props: IPropForm ) => {
    const {children} = props
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}