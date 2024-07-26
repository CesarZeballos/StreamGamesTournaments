import Image from "next/image";
import Link from "next/link";
import logo from "../../app/assets/images/icons/logo.png"
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
    // const dispatch = 

    // const [user, setUser] = useState(null)

    // useEffect(() => {
    //     const login = dispatch(setUser())
    // })


    return (
        <div className="bg-BGlight grid grid-cols-[40%_60%] bodyContainer mt-4 overflow-hidden">
        <div>
        <Image src={logo} alt="Logo" className="flex justify-start items-center w-3/4 h-12"/>
        </div>
        <div className="flex justify-end gap-x-8 overflow-hidden p-1">
            <Link className="buttonSecondary" href="/">Home</Link>
            <Link className="buttonSecondary" href="/tournaments">Tournaments</Link>
            <Link className="buttonSecondary" href="/login">Sign In</Link>
            <Link className="buttonPrimary" href="/register">Sign Up</Link>
        </div>
        </div>
    )
}

export default NavBar;


// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState, useAppDispatch } from './store';
// import { fetchData } from './actions';

// const MyComponent: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const items = useSelector((state: RootState) => state.data.items);
//   const status = useSelector((state: RootState) => state.data.status);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchData());
//     }
//   }, [status, dispatch]);