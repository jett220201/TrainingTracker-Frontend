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
                containerClass: 'flex flex-row border-1 border-red-500 bg-red-50 dark:bg-slate-900 rounded-md p-2 items-center gap-2 w-xs lg:w-full',
                iconClass: 'text-red-500 dark:text-red-200 w-5 h-5',
                titleClass: 'text-red-800 dark:text-red-500',
                bodyClass: 'text-red-500 dark:text-red-200'
            };
        case "Success":
            return {
                containerClass: 'flex flex-row border-1 border-green-500 bg-green-50 dark:bg-slate-900 rounded-md p-2 items-center gap-2 w-xs lg:w-full',
                iconClass: 'text-green-500 dark:text-green-200 w-5 h-5',
                titleClass: 'text-green-800 dark:text-green-500',
                bodyClass: 'text-green-500 dark:text-green-200'
            };
        case "Warning":
            return {
                containerClass: 'flex flex-row border-1 border-yellow-500 dark:border-yellow-200 bg-yellow-50 dark:bg-slate-900 rounded-md p-2 items-center gap-2 w-xs lg:w-full',
                iconClass: 'text-yellow-500 dark:text-yellow-200 w-5 h-5',
                titleClass: 'text-yellow-800 dark:text-yellow-500',
                bodyClass: 'text-yellow-500 dark:text-yellow-200'
            };
        default:
            return {
                containerClass: 'flex flex-row border-1 border-blue-500 dark:border-blue-200 bg-blue-50 dark:bg-slate-900 rounded-md p-2 items-center gap-2 w-xs lg:w-full',
                iconClass: 'text-blue-500 dark:text-blue-200 w-5 h-5',
                titleClass: 'text-blue-800 dark:text-blue-500',
                bodyClass: 'text-blue-500 dark:text-blue-200 whitespace-pre-line'
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