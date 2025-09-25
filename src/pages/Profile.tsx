import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import Loading from "../components/Public/Loading";
import InfoCard from "../components/ui/InfoCard";
import IconInput from "../components/ui/IconInput";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_DATA } from "../api/graphql/queries/profile";
import { LucideBicepsFlexed, LucideTrophy, LucideWeight, LucideChartPie, 
    LucideFlame, LucideShieldUser, LucideRuler, LucidePencil,
    LucideCheckCheck, LucideBan, 
    LucideUserRoundPen} from "lucide-react"
import { Tooltip } from "react-tooltip";
import { useState, Fragment, useEffect } from "react";
import { userApi } from "../api/rest/userApi";
import type { Gender } from "../types/general/GenderType";
import { Dialog, DialogPanel, DialogTitle, Transition, Description } from "@headlessui/react";
import type { Alert } from "../types/general/AlertType";
import { IconButton } from "../components/ui/IconButton";
import type { UserEditRequest } from "../types/dto/UserEditRequest";
import AlertBlock from "../components/ui/AlertBlock";
import { useAuthStore } from "../store/AuthStore";
import { genderMap } from "../utils/genderMapper";
import { formatDate } from "../utils/formatDateHelper";

const processGender = (gender: string) => {
    if(gender === "" || gender === undefined) return "";
    return gender.at(0)?.toUpperCase() + gender.slice(1).toLowerCase();
};

function Profile() {
    const {data, loading, error, refetch} = useQuery(GET_PROFILE_DATA);
    const {t} = useTranslation(["profile", "common", "home", "register"]);
    const imgSrc = data?.userInfoById?.gender?.toLowerCase() == "male" ? "/src/assets/male-profile.png" : "/src/assets/female-profile.png";
    const [firstNames, setFirstNames] = useState<string>("");
    const [lastNames, setLastNames] = useState<string>("");
    const [height, setHeight] = useState<number>(0);
    const [gender, setGender] = useState<Gender>("None");
    const [openEditModal, setOpenEditModal] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<Alert>("Error");
    let errorMsg = "";

    useEffect(() => {
        if(data?.userInfoById) {
            setFirstNames(data?.userInfoById?.firstName);
            setLastNames(data?.userInfoById?.lastName);
            setHeight(data?.userInfoById?.height);
            setGender(processGender(data?.userInfoById?.gender) as Gender);
        }
    }, [data]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const handleEdit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        setOpenEditModal(true);
    }

    const checkInputs = () => {
        if(firstNames === "") {
            setAlertType("Error");
            setMessage(t("checkNames", { ns: "profile" }));
            return false;
        }
        if(lastNames === "") {
            setAlertType("Error");
            setMessage(t("checkLastNames", { ns: "profile" }));
            return false;
        }
        if(height <= 0 || height > 300) {
            setAlertType("Error");
            setMessage(t("checkHeight", { ns: "profile" }));
            return false;
        }
        if (gender === "None") {
            setAlertType("Error");
            setMessage(t("checkGender", { ns: "profile" }));
            return false;
        }
        return true;
    }

    const handleConfirmEdit = async () => {
        try {
            setOpenEditModal(false);
            const valid = checkInputs();
            if(!valid) return;

            const payload = {
                name: firstNames,
                lastName: lastNames,
                gender: genderMap[gender],
                height: height
            }

            const response = await userApi.edit(payload as UserEditRequest);
            setMessage(response.message);
            setAlertType("Success");

            // refresh store
            await useAuthStore.getState().fetchUser();

            // refresh info from graphql
            await refetch();

            // hide message
            setTimeout(()=>{
                setMessage("");
            }, 4000);
        }
        catch (error: any) {
            setMessage(error.details != undefined ? error.details : error.message)
            setAlertType("Error");
        }
    }

    return (
        <>
            <TitleHeader title={t("profile", { ns: "common" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 py-6 lg:px-8 lg:py-8 overflow-y-auto">
                <article className="mb-6 mx-4 rounded-lg flex flex-col h-70 border border-gray-200 relative">
                    <section className="h-2/5 bg-linear-to-r from-blue-600 dark:from-slate-800 to-orange-500 dark:to-stone-700 rounded-t-lg"></section>
                    <section className="h-3/5 bg-white dark:bg-linear-to-r dark:from-slate-800 dark:to-stone-700 rounded-b-lg">
                        <div className="absolute top-15 left-5 flex flex-col items-center justify-center bg-gray-200 dark:bg-slate-700 rounded-full">
                            <img src={imgSrc} alt="Profile image" className="w-25 h-25" />
                        </div>
                        <p className="truncate overflow-hidden whitespace-nowrap text-gray-800 dark:text-gray-100 font-bold text-2xl mt-20 ml-2 lg:ml-5 max-w-xs lg:max-w-full">{data.userInfoById?.firstName} {data.userInfoById?.lastName}</p>
                        <p className="text-gray-500 text-lg ml-2 lg:ml-5">{t("memberSince", { ns: "profile" })} {formatDate(new Date(data.userInfoById?.createdAt))}</p>
                    </section>
                </article>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-4 mb-6">
                    <InfoCard tooltipId="tooltipWorkoutsProfile" tooltipContent={t("workoutsTooltip", { ns: "profile" })}
                        title={t("workouts", { ns: "profile" })} titleColor="gray-500"
                        body={data.userInfoById?.workoutsCount} bodyColor="black" footer={""}
                        footerColor="red-500" icon={LucideBicepsFlexed} iconBgColor="bg-red-100"
                        iconColor="red-500" />
                    <Tooltip id="tooltipWorkoutsProfile" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                    
                    <InfoCard tooltipId="tooltipAchievementsProfile" tooltipContent={t("achievementsTooltip", { ns: "profile" })}
                        title={t("achievements", { ns: "profile" })} titleColor="gray-500"
                        body={data.userInfoById?.activeGoalsCount} bodyColor="black" footer={""}
                        footerColor="yellow-500" icon={LucideTrophy} iconBgColor="bg-yellow-100"
                        iconColor="yellow-500" />
                    <Tooltip id="tooltipAchievementsProfile" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                    
                    <InfoCard tooltipId="tooltipWeight" tooltipContent={t("weightTooltip", { ns: "home" })}
                        title={t("currentWeight", { ns: "home" })} titleColor="gray-500"
                        body={`${data.userInfoById?.currentWeight} kg`} bodyColor="black" footer={""}
                        footerColor="green-500" icon={LucideWeight} iconBgColor="bg-green-100"
                        iconColor="green-500" />
                    <Tooltip id="tooltipWeight" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />

                    <InfoCard tooltipId="tooltipBMI" tooltipContent={t("BMI", { ns: "home" })}
                        title={t("currentBMI", { ns: "home" })} titleColor="gray-500"
                        body={`${data.userInfoById?.currentBodyMassIndex}`} bodyColor="black" footer={""}
                        footerColor="blue-500" icon={LucideChartPie} iconBgColor="bg-blue-100"
                        iconColor="blue-500" />
                    <Tooltip id="tooltipBMI" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                    
                    <InfoCard tooltipId="tooltipBFP" tooltipContent={t("BFP", { ns: "home" })}
                        title={t("currentBFP", { ns: "home" })} titleColor="gray-500"
                        body={`${data.userInfoById?.currentBodyFatPercentage} %`} bodyColor="black" footer={""}
                        footerColor="orange-500" icon={LucideFlame} iconBgColor="bg-orange-100"
                        iconColor="orange-500" />
                    <Tooltip id="tooltipBFP" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />
                </div>
                <article className="flex flex-col relative mx-4 lg:gap-4 justify-center h-auto bg-white dark:bg-gray-800 border border-gray-200 rounded-lg p-2 lg:p-4 mb-12 lg:mb-6">
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("personalInfo", { ns: "profile" })}</p>
                    <form onSubmit={handleEdit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full border-t border-gray-300 pt-4 mt-2 lg:mt-0">
                        <IconButton 
                            icon={LucidePencil}
                            label={t("edit", { ns: "profile" })}
                            classname="lg:absolute top-5 right-5 flex items-center justify-center text-white w-full lg:w-fit gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800"
                        />
                        <div>
                            <IconInput inputId="firstNames" onChange={(e) => setFirstNames(e.target.value)}
                                icon={LucideShieldUser} type="text" placeholder={t("firstNamePlaceholder", { ns: "profile" })}
                                label={t("firstNameLabel", { ns: "profile" })} value={firstNames}
                                classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                            <IconInput inputId="lastNames" onChange={(e) => setLastNames(e.target.value)}
                                icon={LucideShieldUser} type="text" placeholder={t("lastNamePlaceholder", { ns: "profile" })}
                                label={t("lastNameLabel", { ns: "profile" })} value={lastNames}
                                classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                        </div>
                        <div>
                            <IconInput inputId="height" onChange={(e) => setHeight(parseInt(e.target.value))}
                                icon={LucideRuler} type="number" placeholder={t("heightPlaceholder", { ns: "profile" })}
                                label={t("heightLabel", { ns: "profile" })} value={height}
                                classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500 dark:text-gray-200" />
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t("genderLabel", { ns: "register" })}</label>
                            <select
                                id="gender"
                                className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                value={gender}
                                onChange={(e) => setGender(e.target.value as Gender)}
                            >
                                <option value="None">{t("genderPlaceholder", { ns: "register" })}</option>
                                <option value="Male">{t("male", { ns: "register" })}</option>
                                <option value="Female">{t("female", { ns: "register" })}</option>
                            </select>
                        </div>
                    </form>
                </article>

                <Transition show={openEditModal} as={Fragment}>
                    <Dialog as="div" onClose={setOpenEditModal} className="relative z-2">
                        <div className="fixed inset-0 bg-black/30" />
                        <div className="fixed inset-0 flex items-center justify-center">
                            <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("edit", { ns: "profile" })}</DialogTitle>
                                <Description className="text-black dark:text-gray-100">{t("editConfirmMessage", { ns: "profile" })}</Description>
                                <div className="flex flex-row mt-4 w-full justify-center items-center gap-4">
                                    <IconButton
                                        icon={LucideCheckCheck}
                                        label={t("confirm", { ns: "profile" })}
                                        classname="flex justify-center items-center gap-2 !bg-blue-800"
                                        onClick={handleConfirmEdit}
                                    />
                                    <IconButton
                                        icon={LucideBan}
                                        label={t("cancel", { ns: "profile" })}
                                        classname="flex justify-center items-center gap-2 !bg-red-800"
                                        onClick={() => { setOpenEditModal(false) }}
                                    />
                                </div>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>

                {message && <div className="flex flex-col justify-center items-center w-full">
                    <AlertBlock icon={LucideUserRoundPen}
                    title={t("edit", { ns: "profile" })}
                    body={message}
                    type={alertType} />
                </div>}
            </div>
        </>
    );
}

export default Profile;