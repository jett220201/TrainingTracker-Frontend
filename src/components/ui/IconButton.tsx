import { type LucideIcon } from "lucide-react"

interface IconButtonProps {
    icon: LucideIcon
    label: string
    classname: string
    onClick?: () => void
}

export function IconButton({icon: Icon, label, classname, onClick} : IconButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={classname}
        >
            <Icon className="w-4 h-4"/>
            {label}
        </button>
    )
}