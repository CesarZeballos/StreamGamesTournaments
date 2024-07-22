import Image from "next/image";
import React, { Suspense } from "react";

export const FindBanner: React.FC = () => {
    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
        <>
        </>
</Suspense>
    )
}

export default FindBanner;