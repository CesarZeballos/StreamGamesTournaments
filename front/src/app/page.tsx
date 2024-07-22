import Image from "next/image";
import React, { Suspense } from "react";
import LiveBanner from "@/components/Home/liveBanner";
import FindBanner from "@/components/Home/findBanner";
import RegisterBanner from "@/components/Home/registerBanner";


const HomePage: React.FC = () => {
return (
    <>
        <h1 className=""></h1>
        <Suspense fallback={<p className="text-5xl text-softViolet">Loading Home Page...</p>}>
        <LiveBanner/>
        <FindBanner/>
        <RegisterBanner/>
        </Suspense>
    </>
);
};

export default HomePage;

