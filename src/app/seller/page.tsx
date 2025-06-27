// components/InnerContent.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Footer from '@/components/footer';
import Header from '@/components/header';
import TopBar from '@/components/top-bar';
import Link from "next/link";

// Info cards under the hero
const infoCards = [
    {
        title: "Store Requirements",
        description:
            "Just make sure your store follows our community guidelines. Once reviewed and approved by our team, you're all set to start selling.",
    },
    {
        title: "Lowest Commission",
        description:
            "We charge a small commission on every sale so you can keep more profits while we handle the rest.",
    },
    {
        title: "Payments Procedure",
        description:
            "Your earnings are stored safely in your PetBazzar Wallet and are available for bank transfer within 2–3 working days.",
    },
];

// “Why Choose Us” benefits
const benefits = [
    { title: "Reach Millions of Pet Lovers", iconSrc: "/seller/c1.png" },
    { title: "Free Store Creation", iconSrc: "/seller/c1.png" },
    { title: "Easy Store Management", iconSrc: "/seller/c1.png" },
    { title: "Fast and Stable Payment", iconSrc: "/seller/c1.png" },
    { title: "Sell with High Impact", iconSrc: "/seller/c1.png" },
    { title: "Pet lovers Friendly", iconSrc: "/seller/c1.png" },
];

export const InnerContent: React.FC = () => {
    return (
        <>
            <TopBar />
            <Header />
            <div className="relative w-full bg-[#f9f9f9]">

                {/* Hero Section with Paw Images */}
                <div className="relative min-h-96">
                    <Image className="absolute  w-1/2" height={400} width={400} src="/seller/paws.png" alt="Hero Background" />

                    {/* Join Section */}
                    <section className="text-center pt-32">
                        <h1 className="text-6xl font-bold ">
                            Join the <span className="text-[#f9690f]">#1 Pet Marketplace</span> &amp; <br /> Grow Your Business
                        </h1>
                        <p className=" mx-auto mt-4 text-xl">
                            Reach thousands of pet lovers looking for the best products and services for their furry friends.
                        </p>
                        <div className="mt-8 mx-auto">
                            <Button className="w-2/3 h-[50px] bg-[#f9690f] text-white">
                                Start Selling Now
                            </Button>
                        </div>
                    </section>
                </div>

                {/* Login Prompt */}
                <div className="flex justify-center items-center  mb-16 pt-10">
                    <span>Already have an account?</span>
                    <Button variant="link" className="text-[#f9690f]">
                        <Link href="/seller/login">
                            Login
                        </Link>                            
                        
                    </Button>
                </div>

                {/* Onboarding Steps */}
                <section className="bg-[#ffc184] py-6">
                    <h2 className="text-center text-5xl font-bold  leading-20">
                        Get Onboard in 4 steps and start <br /> selling
                    </h2>
                </section>

                <div className="max-w-[1104px] mx-auto py-20 ">
                    {[1, 2, 3, 4].map((step) => {
                        const isEven = step % 2 === 0;
                        return (
                            <div key={step}>
                                {(step == 2 || step == 4) && (
                                    <Image src={`/seller/connector.png`} alt={`Step ${step}`} width={1000} height={200} className=" ml-12" />
                                )
                                }

                                {(step == 3) && (
                                    <Image src={`/seller/connector2.png`} alt={`Step ${step}`} width={1000} height={200} className=" ml-12" />
                                )
                                }


                                <div
                                    key={step}
                                    className={`flex items-center gap-8 ${isEven ? "flex-row-reverse" : ""
                                        }`}
                                >

                                    <Card className={`w-[130px] h-[130px] bg-[#f9690f] flex items-center justify-center relative overflow-hidden ${step <= 2 ? '' : ''}`}>
                                        {step <= 2 && (
                                            <Image
                                                src="/seller/paw.png"
                                                alt="Paw Background"
                                                fill
                                                className="object-cover bg-[#f9690f] "
                                            />
                                        )}
                                        <CardContent className="relative z-10">
                                            <span className="text-[48px] font-bold text-white">{step}</span>
                                        </CardContent>
                                    </Card>



                                    <div className={`flex-1 ${isEven ? "text-right" : ""}`}>
                                        <h3 className="text-[24px] font-semibold mb-2">
                                            {["Signup", "Set Up Your Store", "Upload Products", "Start Earning"][
                                                step - 1
                                            ]}
                                        </h3>
                                        <p className="text-[16px]">
                                            {[
                                                "Create your seller account using email or phone number",
                                                "Add your store details, logo, location and bank details.",
                                                "Start listing items like pet food, accessories, toys, and more.",
                                                "Get orders, deliver to happy customers, and receive payments.",
                                            ][step - 1]}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Why Choose Us */}
                <section className="py-16">
                    <div className="w-4/5 mx-auto bg-[#ffe2cc] rounded-2xl p-10">
                        <h2 className="text-center text-[28px] font-bold mb-10">
                            Why Choose Pet Bazzar?
                        </h2>

                        {/* grid of benefits + laptop image */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
                            {/* benefits grid */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-10 flex-1">
                                {benefits.map((b, i) => (
                                    <div key={i} className="flex flex-col items-start   border">
                                        <Image
                                            src={b.iconSrc}
                                            alt={b.title}
                                            width={22}
                                            height={22}
                                            className="flex-shrink-0 "
                                        />
                                        <span className="font-medium text-base">{b.title}</span>
                                    </div>
                                ))}
                            </div>

                            {/* laptop/image preview */}
                            <div className="w-96">
                                <Image
                                    src="/seller/laptop.png"         // ← your laptop image here
                                    alt="Pet Bazzar dashboard preview"
                                    width={980} height={600}        // adjust to your image's natural size
                                    className="w-full h-auto "
                                />
                            </div>
                        </div>

                        {/* call-to-action */}
                        <div className="text-center">
                            <Button className="w-full px-8 py-3 bg-[#f9690f] text-white">
                                Start Selling Now
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Info Cards */}
                <section className="py-8">
                    <div className="flex flex-wrap justify-center gap-6">
                        {infoCards.map((card, i) => (
                            <Card key={i} className="w-[350px] h-[210px] border-gray-400">
                                <CardContent className="p-6">
                                    <h4 className="text-[20px] font-semibold mb-2">{card.title}</h4>
                                    <p className="text-[14px]">{card.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default InnerContent;
