import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import InfoCard from "../components/ui/InfoCard";
import { LucideChartPie, LucideFlame, LucidePlus, LucideWeight } from "lucide-react";
import { GET_PROGRESS } from "../api/graphql/queries/progress";
import { useQuery } from "@apollo/client";
import Loading from "../components/Public/Loading";
import { Tooltip } from "react-tooltip";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { IconButton } from "../components/ui/IconButton";
import LineChartGraph from "../components/ui/LineChartGraph";
import { useTheme } from "../hooks/useTheme";

function Progress() {
    const {t} = useTranslation(["common", "progress", "home"]);
    let errorMsg = "";
    const {data, loading, error} = useQuery(GET_PROGRESS);
    const { theme } = useTheme();

    if(loading) return <Loading />;

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleNewProgress = () => {

    };

    return (
        <>
            <TitleHeader title={t("title", { ns: "progress" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 py-6 lg:px-8 lg:py-8 overflow-y-auto relative flex flex-col gap-4">
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("overview", { ns: "progress" })}</p>
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={20}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            modules={[Pagination]}
                            className="w-6xl h-40 pb-5"
                        >
                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipWeight" tooltipContent={t("weightTooltip", { ns: "home" })}
                                    cardBgColor="bg-linear-to-r from-blue-600 to-blue-800"
                                    title={t("currentWeight", { ns: "home" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.currentWeight} kg`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideWeight} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipWeight" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipGoalWeight" tooltipContent={t("weightGoalTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-blue-600 to-blue-800"
                                    title={t("weightGoal", { ns: "progress" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.goalWeight} kg`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideWeight} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipGoalWeight" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipProgressWeight" tooltipContent={t("weightProgressTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-blue-600 to-blue-800"
                                    title={t("weightProgress", { ns: "progress" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.weightProgressPercent} %`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideWeight} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipProgressWeight" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipBMI" tooltipContent={t("BMI", { ns: "home" })}
                                    cardBgColor="bg-linear-to-r from-orange-400 to-orange-600"
                                    title={t("currentBMI", { ns: "home" })} titleColor="gray-200"
                                    body={data?.userProgressByUser?.currentBodyMassIndex} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideChartPie} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipBMI" place="top" style={{ backgroundColor: "#f97316", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipGoalBMI" tooltipContent={t("bmiGoalTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-orange-400 to-orange-600"
                                    title={t("bmiGoal", { ns: "progress" })} titleColor="gray-200"
                                    body={data?.userProgressByUser?.goalBodyMassIndex} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideChartPie} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipGoalBMI" place="top" style={{ backgroundColor: "#f97316", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipProgressBMI" tooltipContent={t("bmiProgressTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-orange-400 to-orange-600"
                                    title={t("bmiProgress", { ns: "progress" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.bodyMassIndexProgressPercent} %`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideChartPie} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipProgressBMI" place="top" style={{ backgroundColor: "#f97316", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipBFP" tooltipContent={t("BFP", { ns: "home" })}
                                    cardBgColor="bg-linear-to-r from-green-500 to-emerald-600"
                                    title={t("currentBFP", { ns: "home" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.currentBodyFatPercentage} %`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideFlame} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipBFP" place="top" style={{ backgroundColor: "#10b981", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipGoalBFP" tooltipContent={t("bfpGoalTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-green-500 to-emerald-600"
                                    title={t("bfpGoal", { ns: "progress" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.goalBodyFatPercentage} %`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideFlame} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipGoalBFP" place="top" style={{ backgroundColor: "#10b981", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>

                            <SwiperSlide>
                                <InfoCard tooltipId="tooltipProgressBFP" tooltipContent={t("bfpProgressTooltip", { ns: "progress" })}
                                    cardBgColor="bg-linear-to-r from-green-500 to-emerald-600"
                                    title={t("bfpProgress", { ns: "progress" })} titleColor="gray-200"
                                    body={`${data?.userProgressByUser?.bodyFatProgressPercent} %`} bodyColor="gray-100"
                                    footer="" footerColor=""
                                    icon={LucideFlame} iconBgColor="bg-transparent" iconColor="gray-200"
                                />
                                <Tooltip id="tooltipProgressBFP" place="top" style={{ backgroundColor: "#10b981", color: "white", fontWeight: 500 }} />
                            </SwiperSlide>
                        </Swiper>
                    </section>
                </div>
                
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("weightProgress", { ns: "progress" })}</p>
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <LineChartGraph
                            theme={theme}
                            height={300}
                            width={700}
                            labelX={t("date", { ns: "home" })}
                            labelY={`${t("weight", { ns: "home" })} (kg)`}
                            color={localStorage.getItem("theme") == "light" ? "#1447e6" : "#3b82f6"}
                            labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                            data={data?.userProgressByUser?.progressEntries?.map((entry: { weight: number; }) => entry.weight)}
                        />
                    </section>
                </div>
                
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("bmiProgress", { ns: "progress" })}</p>
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <LineChartGraph
                            theme={theme}
                            height={300}
                            width={700}
                            labelX={t("date", { ns: "home" })}
                            labelY={`${t("BMI", { ns: "home" })}`}
                            color={localStorage.getItem("theme") == "light" ? "#f97316" : "#fdba74"}
                            labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                            data={data?.userProgressByUser?.progressEntries?.map((entry: { bodyMassIndex: number; }) => entry.bodyMassIndex)}
                        />
                    </section>
                </div>
                
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("bfpProgress", { ns: "progress" })}</p>
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <LineChartGraph
                            theme={theme}
                            height={300}
                            width={700}
                            labelX={t("date", { ns: "home" })}
                            labelY={`${t("BFP", { ns: "home" })} %`}
                            color={localStorage.getItem("theme") == "light" ? "#10b981" : "#6ee7b7"}
                            labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                            data={data?.userProgressByUser?.progressEntries?.map((entry: { bodyFatPercentage: number; }) => entry.bodyFatPercentage)}
                        />
                    </section>
                </div>
                
                <IconButton icon={LucidePlus} label={t("newProgress", { ns: "progress" })} onClick={handleNewProgress}
                    classname={"absolute flex items-center text-gray-100 !p-4 !rounded-full bg-blue-700 top-6 right-10 gap-2"}/>
            </div>
        </>
    );
}

export default Progress;