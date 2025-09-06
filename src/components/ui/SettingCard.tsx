import { LucideChevronRight, type LucideIcon } from "lucide-react";

interface SettingCardProps {
    icon: LucideIcon
    iconColor: string
    iconBackground: string
    title: string
    body: string
    callback: () => void
}

function SettingCard({ icon: Icon, iconBackground, iconColor, title, body, callback }: SettingCardProps) {
    return (
        <article onClick={callback} className="flex flex-row rounded-xl p-2 items-center justify-between w-full hover:cursor-pointer hover:bg-gray-100">
            <section className="flex flex-row items-center gap-2">
                <section>
                    <div className={`${iconBackground} p-2 m-2 flex justify-center items-center rounded-xl`}>
                        <Icon className={`w-6 h-6 text-${iconColor}`} />
                    </div>
                </section>
                <section>
                    <p className="text-lg font-semibold text-black">{title}</p>
                    <p className="text-sm text-gray-600">{body}</p>
                </section>
            </section>
            <section>
                <LucideChevronRight className="w-5 h-5 text-gray-400" />
            </section>
        </article>
    );
}

export default SettingCard;