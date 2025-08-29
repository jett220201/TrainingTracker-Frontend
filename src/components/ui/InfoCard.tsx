import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
    title: string;
    titleColor?: string;
    body: string;
    bodyColor?: string;
    footer?: string;
    footerColor?: string;
    icon: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
    cardBgColor?: string;
    tooltipId?: string;
    tooltipContent?: string;
}

function InfoCard({title, titleColor, body, bodyColor, footer, footerColor, icon: Icon, 
    iconBgColor, iconColor, cardBgColor, tooltipId, tooltipContent}: InfoCardProps) {
    return (
        <article data-tooltip-id={tooltipId ?? ""} data-tooltip-content={tooltipContent ?? ""} className={`bg-${cardBgColor ?? 'white'} text-white p-4 rounded-lg border border-gray-200 flex justify-between items-center`}>
            <section>
                <p className={`text-${titleColor ?? 'black'}`}>{title}</p>
                <p className={`text-${bodyColor ?? 'black'} font-bold text-xl`}>{body}</p>
                {footer && <p className={`text-${footerColor ?? 'black'}`}>{footer}</p>}
            </section>
            <section>
                <div className={`w-16 h-16 flex items-center justify-center bg-${iconBgColor ?? cardBgColor} p-3 rounded-full`}>
                    <Icon className={`text-${iconColor ?? 'white'} w-6 h-6`}/>
                </div>
            </section>
        </article>
    );
}



export default InfoCard;