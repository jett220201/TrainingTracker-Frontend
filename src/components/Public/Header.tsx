type HeaderProps = {
    subtitle: string;
};

function Header({ subtitle }: HeaderProps) {
    return <section className="flex flex-col items-center justify-center bg-gray-100 w-fit">
            <img src="/src/assets/logo.png" alt="FitTracker Logo" className="w-16 h-16 mb-4" />
            <p className="text-black font-bold text-2xl">FitTracker</p>
            <p className="text-gray-500">{subtitle}</p>
        </section>;
}

export default Header;