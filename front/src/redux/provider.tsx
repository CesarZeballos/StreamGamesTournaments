'use client';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { IProps } from "@/interfaces/interfaceProps";
import store, { persistor } from "./store";

export function Providers({children}: IProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default Providers;