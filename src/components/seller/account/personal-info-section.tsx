'use client'

import { memo, useState } from 'react'
import { Edit2, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function PersonalInformationSectionComponent() {
  const [isEditing, setIsEditing] = useState(false)
  const sharedInputClass = 'flex-1 border border-orange-400 rounded px-3 py-2 focus-visible:ring-0 disabled:bg-muted/40'

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm px-4 md:px-20">
      <header className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
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
          <label className="w-32 text-sm font-medium text-gray-700">Email :</label>
          <Input type="email" placeholder="zawar****@gmail.com" disabled={!isEditing} className={sharedInputClass} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Phone :</label>
          <Input type="text" placeholder="+92 321 1234567" disabled={!isEditing} className={sharedInputClass} />
        </div>
        <div className="flex items-center space-x-4">
          <label className="w-32 text-sm font-medium text-gray-700">Password :</label>
          <Input type="password" placeholder="********" disabled={!isEditing} className={sharedInputClass} />
        </div>
      </div>
    </section>
  )
}

const PersonalInformationSection = memo(PersonalInformationSectionComponent)
export default PersonalInformationSection


