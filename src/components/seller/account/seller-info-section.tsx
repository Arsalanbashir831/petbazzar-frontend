'use client'

import { memo, useState } from 'react'
import { Edit2, MapPin, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function SellerInformationSectionComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const sharedInputClass = 'flex-1 border border-orange-400 rounded px-3 py-2 focus-visible:ring-0 disabled:bg-muted/40'

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm px-4 md:px-20">
      <header className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Seller Information</h3>
        <Button
          variant="ghost"
          onClick={() => setIsEditing((v) => !v)}
          className="h-8 px-2 text-orange-500 hover:text-orange-600"
        >
          {isEditing ? <Save className="h-5 w-5" /> : <Edit2 className="h-5 w-5" />}
        </Button>
      </header>
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Shop name :</label>
          <Input type="text" placeholder="Fluffy Petshop" disabled={!isEditing} className={sharedInputClass} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Location :</label>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Pet and Vets Clinic, Street 14, Sector H Dha Phase 1, Lahore, 54000"
              disabled={!isEditing}
              className={sharedInputClass + ' pr-10'}
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Seller ID :</label>
          <Input type="text" placeholder="+92 321 1234567" disabled={!isEditing} className={sharedInputClass} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Seller Name :</label>
          <Input type="text" defaultValue="Zawar" disabled={!isEditing} className={sharedInputClass} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Profile Picture :</label>
          <label className="flex-1 flex items-center justify-between cursor-pointer bg-gray-100 px-3 py-2 rounded">
            <span className="text-sm text-gray-500">Click to view or edit store Logo</span>
            <input type="checkbox" className="sr-only peer" />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-orange-500 relative after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </div>
    </section>
  )
}

const SellerInformationSection = memo(SellerInformationSectionComponent)
export default SellerInformationSection


