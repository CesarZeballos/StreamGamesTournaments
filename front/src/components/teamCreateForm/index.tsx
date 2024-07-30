'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export const TeamCreateForm = () => {
    return (
        <div>
            <h1 className="heading4 text-white">{`Let's create your team`}</h1>
        </div>
    )
}