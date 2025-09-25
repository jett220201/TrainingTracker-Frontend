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

export function getBMIRangeLegend(t: (key: string) => string) : Array<any> {
    return [
        {
            value: "< 18.5",
            description: t("underweight"),
            color: "text-yellow-500 dark:text-yellow-200"
        },
        {
            value: "18.5 - 24.9",
            description: t("normalWeight"),
            color: "text-green-500 dark:text-green-200"
        },
        {
            value: "25 - 29.9",
            description: t("overweight"),
            color: "text-orange-500 dark:text-orange-200"
        },
        {
            value: "30 - 39.9",
            description: t("obesity"),
            color: "text-red-500 dark:text-red-200"
        },
        {
            value: ">= 40",
            description: t("morbilityObesity"),
            color: "text-purple-500 dark:text-purple-200"
        },
    ];
}

export function getBFPRangeLegend(t: (key: string) => string) : Array<any> {
    return [
        {
            value: "< 6",
            description: t("essentialFat"),
            color: "text-yellow-500 dark:text-yellow-200"
        },
        {
            value: "6 - 14",
            description: t("athletes"),
            color: "text-green-500 dark:text-green-200"
        },
        {
            value: "14 - 18",
            description: t("fitness"),
            color: "text-blue-500 dark:text-blue-200"
        },
        {
            value: "18 - 25",
            description: t("average"),
            color: "text-orange-500 dark:text-orange-200"
        },
        {
            value: ">= 25",
            description: t("obese"),
            color: "text-red-500 dark:text-red-200"
        },
    ];
}