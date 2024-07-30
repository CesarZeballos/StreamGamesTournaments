'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const TeamCreateForm = () => {
    const router = useRouter();

    const user = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        if (!user) {
            router.push("/")
        }
    }, [router, user])
    
    return (
        <div>
            <h1 className="heading2 text-white">Team Create Form</h1>
        </div>
    )
}