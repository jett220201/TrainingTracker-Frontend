import { type LucideIcon } from "lucide-react"

interface FeatureIconProps {
    icon: LucideIcon
    label: string
    classname: string
}

function FeatureIcon({icon: Icon, label, classname} : FeatureIconProps) {
    return (
        <div className="flex flex-col justify-start items-center text-gray-500 text-xs lg:text-sm font-medium text-center w-20 lg:w-30">
            <div className={classname}>
                <Icon className="w-6 h-6"/>
            </div>
            {label}
        </div>
    );
}

export default FeatureIcon;