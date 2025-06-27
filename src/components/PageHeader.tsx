// src/components/PageHeader.tsx
'use client';

import { UserIcon } from 'lucide-react';
import React from 'react';

export interface PageHeaderProps {
    /** The page’s title (e.g. “Account Information”) */
    title: string;
    /** The current user’s display name */
    userName: string;
}

export function PageHeader({ title, userName }: PageHeaderProps) {
    return (
        <div
            className="
        flex justify-between items-center
        bg-white
         h-[60px]
        rounded-[13px]
        px-[11px] py-[12px]
        shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]
      "
        >
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className='flex items-center gap-2'>
                <span className="text-sm text-muted-foreground">{userName}</span>
                <UserIcon className="w-8 h-8 p-2 bg-gray-500 text-white border-[1px] rounded-full" />
            </div>
        </div>
    )
}
