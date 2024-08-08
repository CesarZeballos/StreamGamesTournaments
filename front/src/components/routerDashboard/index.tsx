'use client'
import { setView } from "@/redux/slices/dashboardSlice"
<<<<<<< HEAD
import { AppDispatch, RootState } from "@/redux/store"
import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchBarDashboard } from "../searchbarDashboard"
import { useRouter } from "next/navigation"
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk"
import { IProps } from "@/interfaces/interfaceProps"

export const RouterDashboard = ({children}: IProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    
    //seteo de la data
    const { user, token} = useSelector((state: RootState) => state.user);
    
    useEffect(() => {
        if (token === null) {
            router.push("/")
        } 
    }, [token, router, dispatch])

    return (
        <div className="grid grid-cols-4 gap-x-16 mb-9">
            <SearchBarDashboard />
            <div className="col-span-3 mt-9">
                <Suspense fallback={<div className="heading5 text-lightViolet">Loading Dashboard...</div>}>
                    {children}
                </Suspense>
            </div>       
=======
import { RootState } from "@/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const RouterDashboard: React.FC = () => {
    const rol = useSelector((state: RootState) => state.user.user?.role);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setView("data"))
        if (rol === 'admin') {
            window.location.href = '/dashboard/admin';
        } else if (rol === 'user') {
            window.location.href = '/dashboard/user';
        } else if (rol === 'organizer') {
            window.location.href = '/dashboard/organizer';
        }
    }, [rol, dispatch])

    return (
        <div className="bodyContainer mt-4">
            <h1 className="body text-white">Loading Dashboard...</h1>
>>>>>>> origin/cesar
        </div>
    )
}