'use client'

import PageHeader from '@/components/common/page-header'
import PersonalInformationSection from '@/components/seller/account/personal-info-section'
import ContactInformationSection from '@/components/seller/account/contact-info-section'
import SellerInformationSection from '@/components/seller/account/seller-info-section'



export default function AccountPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Account Settings"
        icon={{ src: '/seller/dashboard/seller.png', alt: 'Fluffy Petshop Logo' }}
      />

      <div className="space-y-4">
        <PersonalInformationSection />
        <ContactInformationSection />
        <SellerInformationSection />
      </div>
    </div>
  )
}
