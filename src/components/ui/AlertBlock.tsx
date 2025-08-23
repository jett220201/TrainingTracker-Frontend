import type { LucideIcon } from "lucide-react";
import type { Alert } from "../../types/general/AlertType";

interface AlertBlockProps {
    icon: LucideIcon
    title: string
    body: string
    type: Alert
}

function getTypeClassname(type: Alert) {
    let typeColor = "";
    switch (type) {
        case "Error":
            typeColor = "red";
            break;
        case "Success":
            typeColor = "green";
            break;
        case "Warning":
            typeColor = "yellow";
            break;
        default:
            typeColor = "blue";
            break;
    }
    return {
        containerClass: `flex flex-row border-1 border-${typeColor}-500 bg-${typeColor}-50 rounded-md p-2 items-center gap-2 w-90 lg:w-100`,
        iconClass: `text-${typeColor}-500 w-5 h-5`,
        titleClass: `text-${typeColor}-800`,
        bodyClass: `text-${typeColor}-500`
    };
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