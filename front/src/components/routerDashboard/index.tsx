'use client'
import { setView } from "@/redux/slices/dashboardSlice"
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
    }, [rol])

    return (
        <div className="bodyContainer mt-4">
            <h1 className="body text-white">Loading Dashboard...</h1>
        </div>
    )
}