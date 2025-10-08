import { type LucideIcon } from "lucide-react"

interface IconButtonProps {
    icon: LucideIcon
    label: string
    classname: string
    onClick?: () => void
    onClickForm?: (e: React.FormEvent) => void
}

export function IconButton({icon: Icon, label, classname, onClick, onClickForm} : IconButtonProps) {
    return (
        <button 
            onClick={onClick ?? onClickForm}
            className={classname}
        >
            <Icon className="w-4 h-4"/>
            {label}
        </button>
    )
}