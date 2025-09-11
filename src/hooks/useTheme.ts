import { useEffect, useState } from "react";
import type { Theme } from "../types/general/ThemeType";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(localStorage.getItem("theme") as Theme|| "light");
    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);
    return { theme, setTheme };
}