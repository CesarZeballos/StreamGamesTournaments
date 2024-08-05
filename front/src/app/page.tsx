import React, { Suspense } from "react";
import LiveBanner from "@/components/Home/LiveBanner";
import FindBanner from "@/components/Home/FindBanner";
import RegisterBanner from "@/components/Home/RegisterBanner";

const HomePage: React.FC = () => {
return (
    <div className="mt-24">
        <Suspense fallback={<p className="loading">Loading Home Page...</p>}>
        <LiveBanner/>
        <FindBanner/>
        <RegisterBanner/>
        </Suspense>
    </div>
);
};

export default HomePage;