export interface NavItem {
    label: string
    href: string
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badge?: number
}
