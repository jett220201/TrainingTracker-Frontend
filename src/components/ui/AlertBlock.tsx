import type { LucideIcon } from "lucide-react";
import type { Alert } from "../../types/general/AlertType";

interface AlertBlockProps {
    icon: LucideIcon
    title: string
    body: string
    type: Alert
}

function getTypeClassname(type: Alert) {
    switch (type) {
        case "Error":
            return {
                containerClass: 'flex flex-row border-1 border-red-500 bg-red-50 rounded-md p-2 items-center gap-2 w-90 lg:w-100',
                iconClass: 'text-red-500 w-5 h-5',
                titleClass: 'text-red-800',
                bodyClass: 'text-red-500'
            };
        case "Success":
            return {
                containerClass: 'flex flex-row border-1 border-green-500 bg-green-50 rounded-md p-2 items-center gap-2 w-90 lg:w-100',
                iconClass: 'text-green-500 w-5 h-5',
                titleClass: 'text-green-800',
                bodyClass: 'text-green-500'
            };
        case "Warning":

            return {
                containerClass: 'flex flex-row border-1 border-yellow-500 bg-yellow-50 rounded-md p-2 items-center gap-2 w-90 lg:w-100',
                iconClass: 'text-yellow-500 w-5 h-5',
                titleClass: 'text-yellow-800',
                bodyClass: 'text-yellow-500'
            };
        default:
            return {
                containerClass: 'flex flex-row border-1 border-blue-500 bg-blue-50 rounded-md p-2 items-center gap-2 w-90 lg:w-100',
                iconClass: 'text-blue-500 w-5 h-5',
                titleClass: 'text-blue-800',
                bodyClass: 'text-blue-500 whitespace-pre-line'
            };
    }
}

function AlertBlock({icon: Icon, title, body, type} : AlertBlockProps) {
    const typeClassname = getTypeClassname(type)

    return (
        <article className={typeClassname.containerClass}>
            <section className="flex justify-start h-full pt-1">
                <Icon className={typeClassname.iconClass}/>
            </section>
            <section>
                <p className={typeClassname.titleClass}>{title}</p>
                <p className={typeClassname.bodyClass}>{body}</p>
            </section>
        </article>
    );
}

export default AlertBlock;