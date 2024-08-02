"use client";
import Image from "next/image";
import React, { Suspense} from "react";
import bannImage from "../../app/assets/images/banners/regBanner.jpg"

const RegisterBanner: React.FC = () => {

    return (
        <Suspense fallback={<div className="loading">Loading banner...</div>}>
        <div className="grid grid-cols-10 my-36 bodyContainer">
            <div className="col-span-3 flex flex-col justify-center gap-8">
                <h1 className="heading2 text-left text-white">Subscribe and take part in the best tournaments!</h1>
                <button className="buttonPrimary">Subscribe</button>
            </div>

            <div className="col-span-7 relative flex flex-row justify-center rounded-xl">
                <Image
                    src={bannImage}
                    alt="Banner Image"
                    className="w-10/12 h-80 z-0 rounded-3xl rounded-r-3xl"
                />
                <div className="child-container absolute w-2/5 right-0 h-full flex justify-end z-10 bg-opacity-0">
                <div className="flex items-center p-4 bg-BGdark rounded-3xl overflow-hidden father-container">
                    <div className="flex flex-col justify-start gap-y-4">
                        <p className="heading5 text-lightViolet">Create teams!</p>
                        <p className="heading5 text-lightViolet">Sign Up for tournaments</p>
                        <p className="heading5 text-lightViolet">Win amazing primes!</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </Suspense>
    );
};

export default RegisterBanner;