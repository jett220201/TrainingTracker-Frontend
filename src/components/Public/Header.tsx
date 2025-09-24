type HeaderProps = {
    subtitle: string;
    titleColor: string;
    subtitleColor: string; 
};

function Header({ subtitle, subtitleColor, titleColor }: HeaderProps) {
    return (
        <section className="flex flex-col items-center justify-center bg-transparent w-fit">
            <img src="/src/assets/logo.png" alt="FitTracker Logo" className="w-16 h-16" />
            <p className={`${titleColor} font-bold text-2xl`}>FitTracker</p>
            <p className={`${subtitleColor}`}>{subtitle}</p>
        </section>
    );
}

export default Header;