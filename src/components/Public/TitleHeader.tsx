interface TitleHeaderProps {
    title: string
}

function TitleHeader({title}: TitleHeaderProps) {
    return (
        <div className="bg-white dark:bg-slate-950 w-full h-16 p-2 shadow-md border-b border-gray-200 flex items-center">
            <p className="text-3xl font-semibold text-black dark:text-gray-200 p-4">{title}</p>
        </div>
    );
}

export default TitleHeader;