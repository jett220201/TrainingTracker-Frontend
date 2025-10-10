import { type LucideIcon } from "lucide-react"

interface IconButtonProps {
    icon: LucideIcon
    label: string
    classname: string
    iconClassname?: string
    onClick?: () => void
    onClickForm?: (e: React.FormEvent) => void
}

export function IconButton({icon: Icon, label, classname, iconClassname, onClick, onClickForm} : IconButtonProps) {
    return (
        <button 
            onClick={onClick ?? onClickForm}
            className={classname}
        >
            <Icon className={iconClassname ?? "w-4 h-4"}/>
            {label}
        </button>
    )
}