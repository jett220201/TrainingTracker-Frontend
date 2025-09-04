export function getRangeBMI(bmi: number | undefined, t: (key: string) => string): string {
    if (!bmi) return t("unknown");
    if (bmi < 18.5) return t("underweight");
    if (bmi >= 18.5 && bmi < 24.9) return t("normalWeight");
    if (bmi >= 25 && bmi < 29.9) return t("overweight");
    if (bmi >= 30 && bmi < 39.9) return t("obesity");
    if (bmi >= 40) return t("morbilityObesity");
    return t("unknown");
}

export function getRangeBFP(bfp: number | undefined, t: (key: string) => string): string {
    if (!bfp) return t("unknown");
    if (bfp < 6) return t("essentialFat");
    if (bfp >= 6 && bfp < 14) return t("athletes");
    if (bfp >= 14 && bfp < 18) return t("fitness");
    if (bfp >= 18 && bfp < 25) return t("average");
    if (bfp >= 25) return t("obese");
    return t("unknown");
}