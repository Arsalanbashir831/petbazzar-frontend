// app/super-admin/(dashboard)/account/page.tsx
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Edit2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export default function AccountPage() {
    const [email, setEmail] = useState('zawarAhmedfarooqi@gmail.com');
    const [phone, setPhone] = useState('+92 321 1234567');
    const [password, setPassword] = useState('••••••••');
    const [showLogo, setShowLogo] = useState(false);

    return (
        <div className="p-6 space-y-6">
            {/* ─── Page Header Card ───────────────────────────────────────── */}

            <PageHeader title='Account Information' userName='Zawar Ahmed Farooqi' />

            {/* ─── Form Card ─────────────────────────────────────────────── */}
            <div className="bg-card p-6 rounded-lg w-full space-y-6 px-28 border">
                {/* section header with edit icon */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Personal Information</h2>
                    <button className="text-muted-foreground hover:text-foreground">
                        <Edit2 size={20} className='text-orange-500' />
                    </button>
                </div>

                {/* form fields */}
                <form className="space-y-6 max-w-3xl">
                    {/* Email + Phone side by side */}

                    <div>
                        <Label htmlFor="email" className="mb-1 block">Email :</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-orange-400 w-full focus:border-orange-500 focus:ring-orange-500"
                        />
                    </div>


                    <div>
                        <Label htmlFor="phone" className="mb-1 block">Phone :</Label>
                        <Input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                        />
                    </div>

                    {/* Password full width */}
                    <div>
                        <Label htmlFor="password" className="mb-1 block">Password :</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-orange-400 focus:border-orange-500 focus:ring-orange-500"
                        />
                    </div>

                    {/* Profile Picture toggle full width */}
                    <div>
                        <Label htmlFor="profileSwitch" className="mb-1 block">Profile Picture :</Label>
                        <div className="flex items-center border border-orange-400 rounded px-4 py-2">
                            <span className="flex-1 text-sm text-muted-foreground">
                                Click to view or edit store Logo
                            </span>
                            <Switch
                                id="profileSwitch"
                                checked={showLogo}
                                onCheckedChange={setShowLogo}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
