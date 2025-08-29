interface TitleHeaderProps {
    title: string
}

function TitleHeader({title}: TitleHeaderProps) {
    return (
        <div className="bg-white w-full h-16 p-2 shadow-md border-b border-gray-200 flex items-center">
            <p className="text-3xl font-semibold text-black p-4">{title}</p>
        </div>
    );
}

export default TitleHeader;