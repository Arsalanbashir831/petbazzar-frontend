// src/components/ProductCard.tsx
'use client'

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

export interface ProductCardProps {
    imageSrc: string
    title: string
    price: string
    stockLeft?: number
    onAddToCart?: () => void
}

export function ProductCard({
    imageSrc,
    title,
    price,
    stockLeft,
    onAddToCart,
}: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
            {/* Product Image */}
            <div className="relative w-full h-32">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-contain"
                />
            </div>

            {/* Title */}
            <h3 className="mt-2 text-sm font-medium text-foreground">
                {title}
            </h3>

            {/* Price */}
            <div className="mt-1 text-sm font-semibold text-green-600">
                {price}
            </div>

            {/* Stock info */}
            {typeof stockLeft === 'number' && (
                <p className="mt-1 text-xs text-muted-foreground">
                    {stockLeft} left
                </p>
            )}

            {/* Add to Cart button */}
            <button
                onClick={onAddToCart}
                className=" self-end  border-[1px] border-orange-500 px-3 py-[1px]  hover:text-orange-600"
                aria-label="Add to cart"
            >
                <ShoppingCart className="h-5 w-5 text-orange-500" />
            </button>
        </div>
    )
}
