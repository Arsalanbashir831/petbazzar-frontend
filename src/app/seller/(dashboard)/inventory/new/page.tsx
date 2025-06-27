'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// —————————————————————————————————————————————————————————————
// Category data
const LEVEL1 = ['Dog', 'Cat']
const LEVEL2 = [
    'Food',
    'Treats',
    'Walking Essentials',
    'Toys',
    'Health and Hygiene',
    'Others',
]
const LEVEL3: Record<string, string[]> = {
    Food: ['Dry', 'Wet', 'Raw', 'Treats'],
    Treats: [],
    'Walking Essentials': [],
    Toys: [],
    'Health and Hygiene': [],
    Others: [],
}

// —————————————————————————————————————————————————————————————
// A tiny 3-column category picker with “>”
function CategorySelector({
    value,
    onChange,
}: {
    value: { l1: string; l2: string; l3: string }
    onChange: (v: { l1: string; l2: string; l3: string }) => void
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function onOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onOutside)
        return () => document.removeEventListener('mousedown', onOutside)
    }, [])

    const { l1, l2, l3 } = value
    const display = [l1, l2, l3].filter(Boolean).join(' > ')

    return (
        <div ref={ref} className="relative w-full">
            <input
                readOnly
                onClick={() => setOpen((o) => !o)}
                value={display}
                placeholder="Cat > Cat food > Cat food dry"
                className="w-full text-sm border border-orange-500 rounded px-3 py-2 cursor-pointer"
            />
            {open && (
                <div className="absolute z-20 top-full mt-1 w-full h-48 bg-white border border-orange-500 rounded flex overflow-hidden">
                    {/* Level 1 */}
                    <ul className="w-1/3 border-r border-orange-500 overflow-auto">
                        {LEVEL1.map((c) => (
                            <li
                                key={c}
                                onClick={() => onChange({ l1: c, l2: '', l3: '' })}
                                className={cn(
                                    'px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-orange-50',
                                    c === l1 && 'bg-orange-50 font-medium'
                                )}
                            >
                                {c} <span className="text-muted-foreground">&gt;</span>
                            </li>
                        ))}
                    </ul>
                    {/* Level 2 */}
                    <ul className="w-1/3 border-r border-orange-500 overflow-auto">
                        {l1 &&
                            LEVEL2.map((c) => (
                                <li
                                    key={c}
                                    onClick={() => onChange({ l1, l2: c, l3: '' })}
                                    className={cn(
                                        'px-3 py-2 flex justify-between items-center cursor-pointer hover:bg-orange-50',
                                        c === l2 && 'bg-orange-50 font-medium'
                                    )}
                                >
                                    {c} <span>&gt;</span>
                                </li>
                            ))}
                    </ul>
                    {/* Level 3 */}
                    <ul className="w-1/3 overflow-auto">
                        {l2 &&
                            (LEVEL3[l2] || []).map((c) => (
                                <li
                                    key={c}
                                    onClick={() => onChange({ l1, l2, l3: c })}
                                    className={cn(
                                        'px-3 py-2 cursor-pointer hover:bg-orange-50',
                                        c === l3 && 'bg-orange-50 font-medium'
                                    )}
                                >
                                    {c}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

// —————————————————————————————————————————————————————————————
// A simple dashed “+” box for file inputs
function ImageUploader({
    multiple,
    files,
    onChange,
}: {
    multiple?: boolean
    files: File[]
    onChange: (f: File[]) => void
}) {
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div
            onClick={() => ref.current?.click()}
            className="w-full h-28 bg-orange-50 border-2 border-dashed border-orange-200 rounded flex items-center cursor-pointer"
        >
            <div className="w-16 h-16 bg-white rounded flex items-center justify-center mx-4">
                <span className="text-3xl text-orange-500">+</span>
            </div>
            <div className="flex-1 text-sm text-muted-foreground truncate">
                {files.length > 0
                    ? files.map((f) => f.name).join(', ')
                    : 'No file chosen'}
            </div>
            <input
                type="file"
                multiple={multiple}
                accept="image/*"
                ref={ref}
                className="hidden"
                onChange={(e) => {
                    if (!e.target.files) return
                    onChange(Array.from(e.target.files))
                }}
            />
        </div>
    )
}

const STEPS = [
    'Basic Info',
    'Specification',
    'Price, Stock & Variant',
    'Description',
    'Shipping',
] as const

export default function AddProductPage() {
    const router = useRouter()

    // form state
    const [name, setName] = useState('')
    const [category, setCategory] = useState({ l1: '', l2: '', l3: '' })
    const [productImgs, setProductImgs] = useState<File[]>([])
    const [thumbImg, setThumbImg] = useState<File[]>([])
    const [brand, setBrand] = useState('')
    const [variants, setVariants] = useState<
        { weight: string; price: string; stock: string; images: File[] }[]
    >([{ weight: '', price: '', stock: '', images: [] }])
    const [description, setDescription] = useState('')
    const [shipping] = useState('')

    const onUpload = () => {
        console.log({
            name,
            category,
            productImgs,
            thumbImg,
            brand,
            variants,
            description,
            shipping,
        })
    }

    return (
        <div className="flex px-6 py-4 space-x-6">

            {/* Left: all sections */}
            <div className="flex-1 space-y-8">
                {/* header + New Product */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/seller/dashboard/seller.png"
                            alt="Fluffy Petshop"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <h1 className="text-2xl font-semibold">Fluffy Petshop</h1>
                    </div>

                </div>
                {/* Back + Title */}
                <div className="flex items-center space-x-3">
                    <button onClick={() => router.back()} className="p-1">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold">Add Product</h1>
                </div>

                {/* 1) Basic Info */}
                <section className="bg-card p-6 rounded-lg space-y-6">
                    <h2 className="text-xl font-semibold border-b pb-2">
                        Basic Information
                    </h2>
                    <div>
                        <label className="block mb-1 font-medium">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="DIAMOND Care Urinary Support Formula For Adult Cats"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <CategorySelector
                            value={category}
                            onChange={setCategory}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Product Images <span className="text-red-500">*</span>
                        </label>
                        <ImageUploader
                            multiple
                            files={productImgs}
                            onChange={setProductImgs}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Thumbnail Image <span className="text-red-500">*</span>
                        </label>
                        <ImageUploader
                            files={thumbImg}
                            onChange={setThumbImg}
                        />
                        <p className="mt-1 text-sm text-muted-foreground">
                            Displayed as a cover photo for your product
                        </p>
                    </div>
                </section>

                {/* 2) Specification */}
                <section className="bg-card p-6 rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">
                        Product Specification
                    </h2>
                    <div>
                        <label className="block mb-1 font-medium">
                            Brand <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="DIAMOND Care"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none"
                        />
                    </div>
                </section>

                {/* 3) Price, Stock & Variant */}
                <section className="bg-card p-6 rounded-lg space-y-6">
                    <h2 className="text-xl font-semibold border-b pb-2">
                        Price, Stock & Variant
                    </h2>
                    {variants.map((v, i) => (
                        <div key={i} className="space-y-4 border-b pb-4">
                            <h3 className="text-lg font-medium">
                                Variant {i + 1} <span className="text-red-500">*</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium">Weight</label>
                                    <input
                                        type="text"
                                        placeholder="5kg, 10kg, 15kg"
                                        value={v.weight}
                                        onChange={(e) => {
                                            const c = [...variants]
                                            c[i].weight = e.target.value
                                            setVariants(c)
                                        }}
                                        className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Price</label>
                                    <input
                                        type="number"
                                        placeholder="500"
                                        value={v.price}
                                        onChange={(e) => {
                                            const c = [...variants]
                                            c[i].price = e.target.value
                                            setVariants(c)
                                        }}
                                        className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium">Stock</label>
                                    <input
                                        type="number"
                                        placeholder="20"
                                        value={v.stock}
                                        onChange={(e) => {
                                            const c = [...variants]
                                            c[i].stock = e.target.value
                                            setVariants(c)
                                        }}
                                        className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Images</label>
                                <ImageUploader
                                    multiple
                                    files={v.images}
                                    onChange={(files) => {
                                        const c = [...variants]
                                        c[i].images = files
                                        setVariants(c)
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
                        onClick={() =>
                            setVariants((vs) => [
                                ...vs,
                                { weight: '', price: '', stock: '', images: [] },
                            ])
                        }
                    >
                        + Add Variant
                    </button>
                </section>

                {/* 4) Description */}
                <section className="bg-card p-6 rounded-lg space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">
                        Product Description
                    </h2>
                    <textarea
                        rows={6}
                        placeholder="Enter product description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-sm border border-orange-500 rounded px-3 py-2 focus:outline-none resize-none"
                    />
                </section>



                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        onClick={onUpload}
                        className="px-6 py-2 bg-orange-500 text-white rounded-lg"
                    >
                        Upload
                    </button>
                </div>
            </div>

            {/* Right: Stepper */}
            <div className="w-48 mt-16 bg-white rounded-lg p-4 relative">
                {/* connector line from 1.5rem down to 1.5rem above bottom */}
                <div className="absolute left-6 top-6 bottom-6 w-px h-44 bg-muted-foreground" />

                <ul className="space-y-6">
                    {STEPS.map((label) => (
                        <li key={label} className="flex items-center space-x-2">
                            <span
                                className={cn(
                                    'w-4 h-4 rounded-full border bg-white border-muted-foreground relative z-10'
                                )}
                            />
                            <span className="text-sm text-muted-foreground">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}
