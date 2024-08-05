'use client'
import { setView } from "@/redux/slices/dashboardSlice"
import { AppDispatch, RootState } from "@/redux/store"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SearchBarDashboard } from "../searchbarDashboard"
import { useRouter } from "next/navigation"
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk"

export const RouterDashboard: React.FC = () => {
    const router = useRouter();
    const rol = useSelector((state: RootState) => state.user.user?.role);
    const data = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch<AppDispatch>();

    const token = useSelector((state: RootState) => state.user.token);
    useEffect(() => {
        if (token === null) {
            router.push("/")
        }
    }, [router, token, dispatch])
    
    useEffect(() => {
        router.push("/dashboard/user")
    }, [])

    useEffect(() => {
        dispatch(reloadUserSlice({
            email: data?.email!,
            tokenFirebase: data?.tokenFirebase
        }))
        dispatch(setView("notifications"))
    }, [data, dispatch])

    return (
        <div className="grid grid-cols-4 gap-x-6 mt-4">
            <SearchBarDashboard />
            <div className="col-span-2 f-full pt-4 flex justify-center items-center">
                <h1 className="heading5 text-lightViolet">Loading Dashboard...</h1>
            </div>       
        </div>
    )
}