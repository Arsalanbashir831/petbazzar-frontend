import React from "react"
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react"

const popularCategories = [
    "Dog Food",
    "Dog Products",
    "Cat Food",
    "Cat Products",
]

const helpItems = ["Track your Order", "Complaint", "Delivery"]

const contactInfo = [
    {
        icon: <MapPinIcon className="w-5 h-5 text-white" />,
        text: "Street 141, Sector H Dha Phase 1, Lahore, 54000",
    },
    {
        icon: <MailIcon className="w-5 h-5 text-white" />,
        text: "pet.bazzar@gmail.com",
    },
    {
        icon: <PhoneIcon className="w-5 h-5 text-white" />,
        text: "+92 300 1234567",
    },
]

export const Footer: React.FC = () => (
    <footer className="bg-[#f9690f] border-t border-[#d9d9d9] py-8">
        <div className="max-w-[1104px] mx-auto grid grid-cols-4 gap-8 items-start">
            {/* Logo */}
            <div className="flex items-center justify-center">
                <img
                    src="/logo.svg"
                    alt="Pet Bazzar Logo"
                    className="w-48 h-auto"
                />
            </div>

            {/* Popular Categories */}
            <div>
                <h3 className="text-white text-lg font-bold mb-4">
                    Popular Categories
                </h3>
                <ul className="space-y-2 text-white">
                    {popularCategories.map((cat) => (
                        <li key={cat}>{cat}</li>
                    ))}
                </ul>
            </div>

            {/* Help */}
            <div>
                <h3 className="text-white text-lg font-bold mb-4">Help</h3>
                <ul className="space-y-2 text-white">
                    {helpItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Reach Us */}
            <div>
                <h3 className="text-white text-lg font-bold mb-4">Reach Us</h3>
                <ul className="space-y-4">
                    {contactInfo.map(({ icon, text }, i) => (
                        <li key={i} className="flex items-center gap-3 text-white">
                            {icon}
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </footer>
)

export default Footer
