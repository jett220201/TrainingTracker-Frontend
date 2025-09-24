import { type LucideIcon } from "lucide-react"

interface FeatureIconProps {
    icon: LucideIcon;
    label: string;
    labelColor: string;
    classname: string;
}

function FeatureIcon({icon: Icon, label, labelColor, classname} : FeatureIconProps) {
    return (
        <div className={`flex flex-col justify-start items-center ${labelColor} text-xs lg:text-sm font-medium text-center w-20 lg:w-30`}>
            <div className={classname}>
                <Icon className="w-6 h-6"/>
            </div>
            {label}
        </div>
    );
}

export default FeatureIcon;