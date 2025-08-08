import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { useSidebar } from '../ui/sidebar'

type Props = {}

export default function SidebarTrigger({}: Props) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button variant='ghost' className="md:hidden mr-1 p-2 -ml-2" onClick={toggleSidebar}>
      <Menu className="h-5 w-5" />
    </Button>
  )
}