import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface IconLinkProps {
    icon: LucideIcon
    label: string
    classname: string
    to: string
}

function IconLink({icon: Icon, label, classname, to} : IconLinkProps) {
    return (
        <div className="flex flex-row items-center gap-2 p-2 hover:bg-blue-700 group rounded-lg">
            <Icon className="w-6 h-6 text-gray-800 ml-2 group-hover:text-white"/>
            <Link to={to} className={classname}>{label}</Link>
        </div>
    );
}

export default IconLink;