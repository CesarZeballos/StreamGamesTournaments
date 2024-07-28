'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
    const router = useRouter();

        //control de ingreso a la page
        const user = useSelector((state: RootState) => state.user.user);
        useEffect(() => {
            if (!user) {
                router.push("/")
            }
        }, [router, user])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <h1 className="heading2 text-white">Dashboard in process</h1>
        </div>
    )
}

export default Dashboard