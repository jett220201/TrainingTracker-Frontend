interface TitleHeaderProps {
    title: string,
    extraInfo?: string;
}

function TitleHeader({title, extraInfo}: TitleHeaderProps) {
    return (
        <div className="bg-white dark:bg-slate-950 w-full h-16 p-2 shadow-md border-b border-gray-200 flex items-center">
            <p className="text-3xl font-semibold text-black dark:text-gray-200 p-4">{title}</p>
            {extraInfo && <div className="hidden lg:block rounded-3xl bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-100 px-3 py-1 m-2">{extraInfo}</div>}
        </div>
    );
}

export default TitleHeader;