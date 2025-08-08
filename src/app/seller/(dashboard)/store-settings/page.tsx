// src/app/(dashboard)/store-setting/page.tsx
'use client'

import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

const products = [
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },
    {
        id: 1,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Trixie Wavy Pattern Ceramic Dog Bowl',
        price: 'PKR 1,200',
        stockLeft: 10,
    },
    {
        id: 2,
        imageSrc: '/seller/dashboard/petCard.png',
        title: 'Drinkwell Dog & Cat Pet Fountain 1.7L',
        price: 'PKR 5,500',
        stockLeft: 10,
    },

]

export default function StoreSettingPage() {
    return (
        <div className=" flex flex-col ">
            {/* …your cover‐image uploader and header here… */}

            <div className='bg-yellow w-full relative'>
                <Image
                    src="/seller/dashboard/seller.png"
                    alt="Fluffy Petshop Logo"
                    width={900}
                    height={900}
                    className="h-62 w-full  object-cover "
                />
                <div className='flex flex-col justify-center items-center absolute top-20 left-70 gap-5'>
                    <h1 className='text-white text-4xl font-medium'>Replace Cover Image</h1>
                    <div className='flex gap-4'>
                        <Button className='w-40 h-10 bg-transparent hover:bg-transparent text-white border-[1px] border-orange-500 '>Remove </Button>
                        <Button className='w-40 h-10 bg-orange-500 hover:bg-orange-500 text-white border-[1px] border-orange-500 '> Edit Cover</Button>
                    </div>
                </div>
            </div>

            <div className='p-6 pt-0 '>


                <div className='bg-white '>

                    <div className='flex justify-between items-center px-8 py-6 bg-white'>
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

                        <div>
                            <Button className='w-40  px-4 py-2 text-start bg-white hover:bg-white border-[1px] border-black text-black'>Edit Profile</Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Products Grid */}
                    <div className="w-full  flex items-center justify-between pt-4   bg-white px-10">
                        <h2 className="text-4xl font-bold">Products</h2>
                        <div className='flex gap-4'>
                            <h1 className='font-bold text-2xl'>Sort</h1>
                            <Button className='w-40 rounded-full px-4 py-2 text-start bg-white hover:bg-white border-[1px] border-black text-black'>Latest</Button>
                        </div>
                        {/* your Sort dropdown */}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-4 bg-white">
                        {products.map((prod) => (
                            <ProductCard
                                key={prod.id}
                                imageSrc={prod.imageSrc}
                                title={prod.title}
                                price={prod.price}
                                stockLeft={prod.stockLeft}
                                onAddToCart={() => {
                                    /* handle add to cart */
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
