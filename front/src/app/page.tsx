import React, { Suspense } from "react";
import LiveBanner from "@/components/Home/LiveBanner";
import FindBanner from "@/components/Home/FindBanner";
import RegisterBanner from "@/components/Home/RegisterBanner";

const HomePage: React.FC = () => {
return (
    <>
        <Suspense fallback={<p className="loading">Loading Home Page...</p>}>
        <LiveBanner/>
        <div className="bodyContainer">
        <FindBanner/>
        <RegisterBanner/>
        </div>
        </Suspense>
    </>
);
};

export default HomePage;