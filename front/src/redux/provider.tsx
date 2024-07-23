'use client'
import { Provider } from "react-redux";
import { IProps } from "@/interfaces/interfaceProps";
import { store } from "./store";
export function Providers({children}: IProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Provider;