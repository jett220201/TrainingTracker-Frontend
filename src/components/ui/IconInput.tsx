import { type LucideIcon } from "lucide-react"

interface IconInputProps {
    inputId: string
    icon: LucideIcon
    type: string
    placeholder: string
    classname: string
    label: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function IconInput({icon: Icon, type, placeholder, classname, label, inputId, onChange} : IconInputProps) {
    return (
        <>
            <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
            <div className="relative w-full">
                <Icon className="absolute left-2 top-5 -translate-y-1/2 w-6 h-6 text-gray-300"></Icon>
                <input id={inputId} type={type} placeholder={placeholder} className={classname} onChange={onChange}/>
            </div>
        </>
    );
}

export default IconInput;