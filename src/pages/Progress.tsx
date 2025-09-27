import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import InfoCard from "../components/ui/InfoCard";
import { LucideChartPie, LucideFlame, LucidePlus, LucideShield, LucideWeight } from "lucide-react";
import { GET_PROGRESS } from "../api/graphql/queries/progress";
import { useQuery } from "@apollo/client";
import Loading from "../components/Public/Loading";
import { Tooltip } from "react-tooltip";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { IconButton } from "../components/ui/IconButton";
import LineChartGraph from "../components/ui/LineChartGraph";
import { useTheme } from "../hooks/useTheme";
import { getBFPRangeLegend, getBMIRangeLegend } from "../utils/fitnessHelper";
import { Dialog, DialogPanel, DialogTitle, Transition, Description } from "@headlessui/react";
import { Fragment, useState } from "react";
import AlertBlock from "../components/ui/AlertBlock";
import type { Alert } from "../types/general/AlertType";
import IconInput from "../components/ui/IconInput";
import { userProgressApi } from "../api/rest/userProgressApi";
import type { UserProgressRequest } from "../types/dto/UserProgressRequest";
import { formatDate } from "../utils/formatDateHelper";

function Progress() {
    const {t} = useTranslation(["common", "progress", "home"]);
    let errorMsg = "";
    const {data, loading, error, refetch} = useQuery(GET_PROGRESS);
    const { theme } = useTheme();
    const [openModalNewProgress, setOpenModelNewProgress] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [newWeight, setNewWeight] = useState<number>(0);
    const [alertType, setAlertType] = useState<Alert>("Tip");
    const legendBMI = getBMIRangeLegend(t);
    const legendBFP = getBFPRangeLegend(t);

    if(loading) return <Loading />;

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const handleAddNewProgress = async (e : React.FormEvent) => {
        e.preventDefault();

        if(newWeight <= 0) {
            setAlertType("Error");
            setMessage(t("newWeightError", { ns: "progress" }));
            return;
        }

        try {
            const payload = {
                weight: newWeight
            }
            const response = await userProgressApi.add(payload as UserProgressRequest);
            setAlertType("Success");
            setMessage(response.message);
            
            // refresh data for charts
            await refetch();

            // hide message
            setTimeout(()=>{
                setMessage("");
                setOpenModelNewProgress(false);
            }, 3000);
        }
        catch (error : any) {
            setAlertType("Error");
            setMessage(error.details != undefined ? error.details : error.message)
        }
    };

    return (
        <>
            <TitleHeader title={t("title", { ns: "progress" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 pt-2 pb-18 lg:px-8 lg:pt-8 lg:pb-8 overflow-y-auto relative flex flex-col gap-4">
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("overview", { ns: "progress" })}</p>
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200">
                        <Swiper
                            breakpoints={{
                                0: { slidesPerView: 1 }, 
                                768: { slidesPerView: 3 },
                            }}
                            spaceBetween={20}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            modules={[Pagination]}
                            className="w-xs lg:w-6xl h-35 lg:h-40 lg:pb-5"
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
                                    body={`${data?.userProgressByUser?.weightProgressPercent.toFixed(2)} %`} bodyColor="gray-100"
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
                                    body={`${data?.userProgressByUser?.bodyMassIndexProgressPercent.toFixed(2)} %`} bodyColor="gray-100"
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
                                    body={`${data?.userProgressByUser?.bodyFatProgressPercent.toFixed(2)} %`} bodyColor="gray-100"
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
                    <section className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200">
                        <div className="hidden lg:block">
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
                        </div>
                        <div className="block lg:hidden">
                            <LineChartGraph
                                theme={theme}
                                height={200}
                                width={300}
                                labelX={t("date", { ns: "home" })}
                                labelY={`${t("weight", { ns: "home" })} (kg)`}
                                color={localStorage.getItem("theme") == "light" ? "#1447e6" : "#3b82f6"}
                                labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                                data={data?.userProgressByUser?.progressEntries?.map((entry: { weight: number; }) => entry.weight)}
                            />
                        </div>
                    </section>
                </div>
                
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("bmiProgress", { ns: "progress" })}</p>
                    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-2 lg:gap-10 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200">
                        {legendBMI.length > 0 && (
                            <ul className="rounded-lg border border-gray-200 p-2">
                                {
                                    legendBMI.map((item, index) => (
                                        <li key={index} className={`${item.color}`}>{`${item.value} → ${item.description}`}</li>
                                    ))
                                }
                            </ul>
                        )}
                        <div className="hidden lg:block">
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
                        </div>
                        <div className="block lg:hidden">
                            <LineChartGraph
                                theme={theme}
                                height={200}
                                width={300}
                                labelX={t("date", { ns: "home" })}
                                labelY={`${t("simpleBMI", { ns: "progress" })}`}
                                color={localStorage.getItem("theme") == "light" ? "#f97316" : "#fdba74"}
                                labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                                data={data?.userProgressByUser?.progressEntries?.map((entry: { bodyMassIndex: number; }) => entry.bodyMassIndex)}
                            />
                        </div>
                    </section>
                </div>
                
                <div>
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("bfpProgress", { ns: "progress" })}</p>
                    <section className="flex flex-col-reverse lg:flex-row items-center justify-center gap-2 lg:gap-10 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200">
                        {legendBFP.length > 0 && (
                            <ul className="rounded-lg border border-gray-200 p-2">
                                {
                                    legendBFP.map((item, index) => (
                                        <li key={index} className={`${item.color}`}>{`${item.value} → ${item.description}`}</li>
                                    ))
                                }
                            </ul>
                        )}
                        <div className="hidden lg:block">
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
                        </div>
                        <div className="block lg:hidden">
                            <LineChartGraph
                                theme={theme}
                                height={200}
                                width={300}
                                labelX={t("date", { ns: "home" })}
                                labelY={`${t("simpleBFP", { ns: "progress" })} %`}
                                color={localStorage.getItem("theme") == "light" ? "#10b981" : "#6ee7b7"}
                                labels={data?.userProgressByUser?.progressEntries?.map((entry: { createdAt: string; }) => formatDate(new Date(entry.createdAt)))}
                                data={data?.userProgressByUser?.progressEntries?.map((entry: { bodyFatPercentage: number; }) => entry.bodyFatPercentage)}
                            />
                        </div>
                    </section>
                </div>
                
                <IconButton icon={LucidePlus} label={t("newProgress", { ns: "progress" })} onClick={() => setOpenModelNewProgress(true)}
                    classname={"hidden lg:flex absolute items-center text-gray-100 !p-4 !rounded-full bg-blue-700 top-6 right-10 gap-2"} />

                <IconButton icon={LucidePlus} label="" onClick={() => setOpenModelNewProgress(true)}
                    classname={"block lg:hidden absolute text-gray-100 !p-4 !rounded-full bg-blue-700 top-3 right-10"} />
            </div>

            <Transition show={openModalNewProgress} as={Fragment}>
                <Dialog as="div" onClose={setOpenModelNewProgress} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("newProgress", { ns: "progress" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("newProgressDescription", { ns: "progress" })}</Description>
                            <form className="flex flex-col gap-4 mt-2 mb-4" onSubmit={handleAddNewProgress}>
                                <IconInput inputId="newWeight" onChange={(e) => setNewWeight(parseFloat(e.target.value))}
                                    icon={LucideWeight} type="number" placeholder={t("weightPlaceholder", { ns: "progress" })} label={t("weightLabel", { ns: "progress" })}
                                    classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                                <IconButton label={t("saveProgress", { ns: "progress" })} icon={LucideShield}
                                    classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                            </form>
                            {message && <AlertBlock icon={LucideShield}
                                title={""}
                                body={message}
                                type={alertType} />}
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default Progress;