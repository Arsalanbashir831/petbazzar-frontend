import React from "react";
import {
    PhoneIcon,
    MailIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    YoutubeIcon,
} from "lucide-react";

const socialIcons = [
    { icon: <InstagramIcon className="h-4 w-4 text-light-text-color" />, alt: "Instagram" },
    { icon: <YoutubeIcon className="h-4 w-4 text-light-text-color" />, alt: "Youtube" },
    { icon: <FacebookIcon className="h-4 w-4 text-light-text-color" />, alt: "Facebook" },
    { icon: <TwitterIcon className="h-4 w-4 text-light-text-color" />, alt: "Twitter" },
];

export const TopBar: React.FC = () => (
    <nav className="w-full h-[58px] bg-[#3C726E] text-white">
        <div className="h-full max-w-[1440px] mx-auto flex items-center justify-between px-6">
            <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-[5px] p-2.5 rounded-[5px]">
                    <PhoneIcon className="h-4 w-4 text-light-text-color" />
                    <span className="font-bold text-light-text-color text-sm">
                        0987-0987-09
                    </span>
                </div>
                <div className="flex items-center gap-[5px] p-2.5 rounded-[5px]">
                    <MailIcon className="h-4 w-4 text-light-text-color" />
                    <span className="font-bold text-light-text-color text-sm">
                        zawarahmedfarooqi@example.com
                    </span>
                </div>
            </div>
            <div className="p-2.5">
                <span className="font-bold text-light-text-color text-sm">
                    Follow Us&nbsp;&nbsp;and get a chance to win 80% off
                </span>
            </div>
            <div className="flex items-center p-2.5 gap-2">
                <span className="font-bold text-light-text-color text-sm">
                    Follow Us&nbsp;:
                </span>
                <div className="flex items-center gap-2">
                    {socialIcons.map((social, i) => (
                        <div key={i} className="p-[5px] cursor-pointer">
                            {social.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </nav>
);

export default TopBar;
