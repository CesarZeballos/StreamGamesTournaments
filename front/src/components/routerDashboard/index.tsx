'use client'
import { setView } from "@/redux/slices/dashboardSlice"
import { RootState } from "@/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchBarDashboard } from "../searchbarDashboard"

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
        <div className="grid grid-cols-4 gap-x-6 mt-4">
            <SearchBarDashboard />
            <div className="col-span-2 f-full pt-4 flex justify-center items-center">
                <h1 className="heading5 text-lightViolet">Loading Dashboard...</h1>
            </div>       
        </div>
    )
}