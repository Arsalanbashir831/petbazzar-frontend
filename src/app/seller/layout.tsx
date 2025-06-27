// src/app/seller/layout.tsx


import { ReactNode } from 'react';




export default function SellerLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-100">
            
            <main className="">{children}</main>
          
        </div>
    );
}
