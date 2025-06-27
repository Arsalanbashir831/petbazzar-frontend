import React from "react";
import { Heart, SearchIcon, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Header: React.FC = () => (
    <header className="w-full">
        <nav className="w-full h-20 bg-[#f9690f]">
            <div className="flex h-20 items-center justify-between px-[50px] mx-auto max-w-[1440px]">
                <img
                    src="/logo.svg"
                    alt="Pet bazzar logo"
                    className="w-[88px] h-[65px]"
                />

                <div className="relative flex-1 max-w-[800px] mx-4">
                    <div className="flex items-center bg-white rounded-full border px-2.5 py-1">
                        <div className="flex-1 px-8">
                            <Input
                                placeholder="Search for products, food, or animals"
                                className="border-none shadow-none placeholder:text-[#7f7b7b] focus-visible:ring-0"
                            />
                        </div>
                        <button className="w-[31px] h-[31px] bg-[#f9690f] rounded-[15px] flex items-center justify-center">
                            <SearchIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-[27px]">
                    <div className="flex items-end gap-[18px]">

                        <User className="w-[25px] h-[25px] text-white" />
                        <Heart className="w-[25px] h-[25px] text-white" />
                        <div className="">
                            
                            <ShoppingCart className="relative w-[25px] h-[25px] text-white" />
                            
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;
