'use client'

import Image from 'next/image'
import { Edit2, MapPin } from 'lucide-react'



export default function AccountPage() {
    return (
        <div className="space-y-6 p-6">
            {/* 1) Logo + Shop Name */}
            <div className="flex items-center space-x-2">
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="Fluffy Petshop Logo"
                    width={900}
                    height={900}
                    className="h-8 w-8  object-cover "
                />
                <h1 className="text-2xl font-semibold">Fluffy Petshop</h1>
            </div>

            {/* 2) Page Title */}
            <h2 className="text-lg font-medium">Account Settings</h2>

            <div className="space-y-4">
                {/* Personal Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm px-20">
                    <header className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <button>
                            <Edit2 className="h-5 w-5  text-orange-500" />
                        </button>
                    </header>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Email :
                            </label>
                            <input
                                type="email"
                                
                                placeholder="zawar****@gmail.com"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Phone :
                            </label>
                            <input
                                type="text"
                                
                                placeholder="+92 321 1234567"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Password :
                            </label>
                            <input
                                type="password"
                                
                                placeholder="********"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm px-20">
                    <header className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <button>
                            <Edit2 className="h-5 w-5  text-orange-500" />
                        </button>
                    </header>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Email :
                            </label>
                            <input
                                type="email"
                                
                                placeholder="zawar****@gmail.com"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Phone :
                            </label>
                            <input
                                type="text"
                                
                                placeholder="+92 321 1234567"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Seller Information */}
                <section className="bg-white p-6 rounded-lg shadow-sm px-20">
                    <header className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Seller Information</h3>
                        <button>
                            <Edit2 className="h-5 w-5 text-orange-500" />
                        </button>
                    </header>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Shop name :
                            </label>
                            <input
                                type="text"
                                
                                placeholder="Fluffy Petshop"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Location :
                            </label>
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    
                                    placeholder="Pet and Vets Clinic, Street 14, Sector H Dha Phase 1, Lahore, 54000"
                                    className="w-full border border-orange-400 rounded px-3 py-2 pr-10 focus:outline-none"
                                />
                                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Seller ID :
                            </label>
                            <input
                                type="text"
                                
                                placeholder="+92 321 1234567"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Seller Name :
                            </label>
                            <input
                                type="text"
                                
                                defaultValue="Zawar"
                                className="flex-1 border border-orange-400 rounded px-3 py-2 focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <label className="w-32 text-sm font-medium text-gray-700">
                                Profile Picture :
                            </label>
                            <label className="flex-1 flex items-center justify-between cursor-pointer bg-gray-100 px-3 py-2 rounded">
                                <span className="text-sm text-gray-500">
                                    Click to view or edit store Logo
                                </span>
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-orange-500 relative after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
