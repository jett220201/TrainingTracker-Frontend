import { useTranslation } from "react-i18next";
import TitleHeader from "../components/Public/TitleHeader";
import { useQuery } from "@apollo/client";
import { GET_GOALS } from "../api/graphql/queries/goals";
import Loading from "../components/Public/Loading";
import { useState, Fragment } from "react";
import type { Alert } from "../types/general/AlertType";
import type { GoalType } from "../types/general/GoalType";
import type { GoalDirection } from "../types/general/GoalDirectionType";
import type { UserGoalRequest } from "../types/dto/UserGoalRequest";
import { userGoalsApi } from "../api/rest/userGoalsApi";
import { goalTypeMap } from "../utils/goalTypeMapper";
import { goalDirectionMap } from "../utils/goalDirectionMapper";
import { LucideCalendar, LucideCalendarX2, LucideChartLine, LucideCheck, 
    LucideCheckCheck, LucideGoal, LucideScrollText, LucideShield, LucideTrophy, 
    LucideBan, 
    LucidePlus} from "lucide-react";
import InfoCard from "../components/ui/InfoCard";
import { Dialog, DialogPanel, DialogTitle, Transition, Description } from "@headlessui/react";
import AlertBlock from "../components/ui/AlertBlock";
import { Tooltip } from "react-tooltip";
import IconInput from "../components/ui/IconInput";
import { DayPicker } from "react-day-picker";
import { enUS, es } from "react-day-picker/locale";
import i18n from "../i18n";
import { IconButton } from "../components/ui/IconButton";
import { formatDate } from "../utils/formatDateHelper";
import GoalCard from "../components/ui/GoalCard";

function Goals() {
    const {t} = useTranslation(["goals", "common"]);
    let errorMsg = "";
    const {data, loading, error, refetch} = useQuery(GET_GOALS);
    const [message, setMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<Alert>("Tip");
    const [description, setDescription] = useState<string>("");
    const [targetValue, setTargetValue] = useState<number>(0);
    const [goalType, setGoalType] = useState<GoalType>("None");
    const [goalDirection, setGoalDirection] = useState<GoalDirection>("None");
    const [goalDate, setGoalDate] = useState<Date>();
    const [openCreateGoalModal, setOpenCreateGoalModal] = useState(false);
    const [openEditGoalModal, setOpenEditGoalModal] = useState(false);
    const [openDeleteGoalModal, setOpenDeleteGoalModal] = useState(false);
    const [currentGoalId, setCurrentGoalId] = useState<number>(0);
    const [currentDescription, setCurrentDescription] = useState<string>("");
    const [currentTargetValue, setCurrentTargetValue] = useState<number>(0);
    const [currentGoalType, setCurrentGoalType] = useState<GoalType>("None");
    const [currentGoalDirection, setCurrentGoalDirection] = useState<GoalDirection>("None");
    const [currentGoalDate, setCurrentGoalDate] = useState<Date>();
    const [openCalendar, setOpenCalendar] = useState<Boolean>(false);
    
    if (loading) return <Loading />;

    if (error) {
        errorMsg = error.graphQLErrors.map((err) => err.extensions?.message).join(", ");
        console.error(errorMsg);
    }

    const handleAddNewGoal = async (e: React.FormEvent) => {
        e.preventDefault();

        if(targetValue <= 0) {
            setAlertType("Warning");
            setMessage(t("zeroTargetValue", { ns: "goals"}));
            return;
        }
        if(description.length == 0) {
            setAlertType("Warning");
            setMessage(t("emptyDescription", { ns: "goals"}));
            return;
        }
        if(goalType == "None") {
            setAlertType("Warning");
            setMessage(t("noneGoalType", { ns: "goals"}));
            return;
        }
        if(goalDirection == "None") {
            setAlertType("Warning");
            setMessage(t("noneGoalDirection", { ns: "goals"}));
            return;
        }
        if(!goalDate || goalDate < new Date()) {
            setAlertType("Warning");
            setMessage(t("pastGoalDate", { ns: "goals"}));
            return;
        }

        try {
            const payload = {
                description: description,
                targetValue: targetValue,
                goalType: goalTypeMap[goalType],
                goalDirection: goalDirectionMap[goalDirection],
                goalDate : goalDate?.toISOString().split("T")[0]
            }

            const response = await userGoalsApi.add(payload as UserGoalRequest);
            setAlertType("Success");
            setMessage(response.message);
            
            // refresh data for charts
            await refetch();

            // hide message
            setTimeout(()=>{
                setMessage("");
                setOpenCreateGoalModal(false);
            }, 3000);
        }
        catch (error : any) {
            setAlertType("Error");
            setMessage(error.details != undefined ? error.details : 
                error.message != undefined ? error.message : Object.values(error.errors).join(', '))
        }
    }

    const handleEditGoal = async (e: React.FormEvent) => {
        e.preventDefault();

        if(currentTargetValue <= 0) {
            setAlertType("Warning");
            setMessage(t("zeroTargetValue", { ns: "goals"}));
            return;
        }
        if(currentDescription.length == 0) {
            setAlertType("Warning");
            setMessage(t("emptyDescription", { ns: "goals"}));
            return;
        }
        if(currentGoalType == "None") {
            setAlertType("Warning");
            setMessage(t("noneGoalType", { ns: "goals"}));
            return;
        }
        if(currentGoalDirection == "None") {
            setAlertType("Warning");
            setMessage(t("noneGoalDirection", { ns: "goals"}));
            return;
        }
        if(!currentGoalDate || currentGoalDate < new Date()) {
            setAlertType("Warning");
            setMessage(t("pastGoalDate", { ns: "goals"}));
            return;
        }

        try {
            const payload = {
                id: currentGoalId,
                description: currentDescription,
                targetValue: currentTargetValue,
                goalType: goalTypeMap[currentGoalType],
                goalDirection: goalDirectionMap[currentGoalDirection],
                goalDate : currentGoalDate?.toISOString().split("T")[0]
            }

            const response = await userGoalsApi.edit(payload as UserGoalRequest);
            setAlertType("Success");
            setMessage(response.message);
            
            // refresh data for charts
            await refetch();

            // hide message
            setTimeout(()=>{
                setMessage("");
                setOpenEditGoalModal(false);
            }, 3000);
        }
        catch (error : any) {
            setAlertType("Error");
            setMessage(error.details != undefined ? error.details : error.message)
        }
    }

    const handleDeleteGoal = async () => {
        try {
            const payload = currentGoalId;

            const response = await userGoalsApi.delete(payload);
            setAlertType("Success");
            setMessage(response.message);
            
            // refresh data for charts
            await refetch();

            // hide message
            setTimeout(()=>{
                setMessage("");
                setOpenDeleteGoalModal(false);
            }, 3000);
        }
        catch (error : any) {
            setAlertType("Error");
            setMessage(error.details != undefined ? error.details : error.message)
        }
    }

    const handleDateSelect = (date?: Date) => {
        setGoalDate(date);
        setOpenCalendar(!openCalendar);
    }

    const handleDeleteClick = (id: number) => {
        setCurrentGoalId(id);
        setOpenDeleteGoalModal(true);
    }

    const dateMaker = (date : string) : Date => {
        return new Date(`${date} 00:00:00`);
    }

    const handleEditClick = (id: number, description: string, targetValue: number,
        goalType: GoalType, goalDirection: GoalDirection, goalDate: string) => {
        setCurrentGoalId(id);
        setCurrentDescription(description);
        setCurrentTargetValue(targetValue);
        setCurrentGoalType(goalType);
        setCurrentGoalDirection(goalDirection);
        setCurrentGoalDate(dateMaker(goalDate));
        setOpenEditGoalModal(true);
    }

    const getNormalizedString = (value : string) : string => {
        return value[0].toUpperCase() + value.slice(1).toLowerCase();
    };

    return (
        <>
            <TitleHeader title={t("achievements", { ns: "common" })} />
            <div className="bg-neutral-50 dark:bg-slate-950 min-h-[calc(100vh-4rem)] h-100 px-2 pt-2 pb-18 lg:px-8 lg:pt-8 lg:pb-8 overflow-y-auto relative flex flex-col gap-4">
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <InfoCard tooltipId="tooltipActiveGoals" tooltipContent={t("activeGoalsTooltip", { ns: "goals" })}
                        cardBgColor="bg-linear-to-r from-blue-600 to-blue-800"
                        title={t("activeGoals", { ns: "goals" })} titleColor="gray-200"
                        body={`${data?.goalsByUser?.activeGoals}`} bodyColor="gray-100"
                        footer="" footerColor=""
                        icon={LucideGoal} iconBgColor="bg-transparent" iconColor="gray-200"
                    />
                    <Tooltip id="tooltipActiveGoals" place="top" style={{ backgroundColor: "#1447e6", color: "white", fontWeight: 500 }} />

                    <InfoCard tooltipId="tooltipCompletedGoals" tooltipContent={t("completedGoalsTooltip", { ns: "goals" })}
                        cardBgColor="bg-linear-to-r from-green-500 to-emerald-600"
                        title={t("completedGoals", { ns: "goals" })} titleColor="gray-200"
                        body={`${data?.goalsByUser?.completedGoals}`} bodyColor="gray-100"
                        footer="" footerColor=""
                        icon={LucideTrophy} iconBgColor="bg-transparent" iconColor="gray-200"
                    />
                    <Tooltip id="tooltipCompletedGoals" place="top" style={{ backgroundColor: "#10b981", color: "white", fontWeight: 500 }} />
                    
                    <InfoCard tooltipId="tooltipOverdueGoals" tooltipContent={t("overdueGoalsTooltip", { ns: "goals" })}
                        cardBgColor="bg-linear-to-r from-orange-400 to-orange-600"
                        title={t("overdueGoals", { ns: "goals" })} titleColor="gray-200"
                        body={`${data?.goalsByUser?.overdueGoals}`} bodyColor="gray-100"
                        footer="" footerColor=""
                        icon={LucideCalendarX2} iconBgColor="bg-transparent" iconColor="gray-200"
                    />
                    <Tooltip id="tooltipOverdueGoals" place="top" style={{ backgroundColor: "#f97316", color: "white", fontWeight: 500 }} />

                    <InfoCard tooltipId="tooltipTotalGoals" tooltipContent={t("totalGoalsTooltip", { ns: "goals" })}
                        cardBgColor="bg-linear-to-r from-rose-600 to-rose-800"
                        title={t("totalGoals", { ns: "goals" })} titleColor="gray-200"
                        body={`${data?.goalsByUser?.totalGoals}`} bodyColor="gray-100"
                        footer="" footerColor=""
                        icon={LucideChartLine} iconBgColor="bg-transparent" iconColor="gray-200"
                    />
                    <Tooltip id="tooltipTotalGoals" place="top" style={{ backgroundColor: "#f43f5e", color: "white", fontWeight: 500 }} />
                </section>
                <div className="flex w-full items-center justify-between">
                    <p className="text-2xl font-bold p-4 text-black dark:text-gray-100">{t("yourGoals", { ns: "goals" })}</p>
                    <IconButton icon={LucidePlus} label={t("createGoalTitle", { ns: "goals" })} onClick={() => setOpenCreateGoalModal(true)}
                        classname={"hidden lg:flex items-center text-gray-100 !p-4 !rounded-lg bg-blue-700 gap-2"} />

                    <IconButton icon={LucidePlus} label="" onClick={() => setOpenCreateGoalModal(true)}
                        classname={"block lg:hidden text-gray-100 !p-4 !rounded-full bg-blue-700"} />
                </div>
                <section className="flex flex-col lg:gap-4 justify-start h-auto overflow-y-auto [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:hover:bg-gray-500 [&::-webkit-scrollbar]:w-2">
                    {data?.goalsByUser?.userGoals?.length > 0 ?
                        <>
                            {data?.goalsByUser?.userGoals?.map((item : any, index : number) => (
                                <GoalCard key={index} createdAt={item?.createdAt}
                                    currentValue={item?.currentValue} description={item?.description} goalDate={item?.goalDate} 
                                    goalDirection={item?.goalDirection} goalStatus={item?.goalStatus} goalType={item?.goalType}
                                    progressPercent={item?.progressPercent} targetValue={item?.targetValue}
                                    onDelete={() => {handleDeleteClick(item?.id)}} translate={t}
                                    onEdit={() => {handleEditClick(item?.id, item?.description, item?.targetValue, item?.goalType, item?.goalDirection, item?.goalDate)}}
                                />
                            ))}
                        </> 
                        :
                        <p className="text-lg font-semibold text-center p-4 text-gray-500 dark:text-gray-100">{t("noGoals",  { ns: "goals" })}</p>
                    }
                </section>
            </div>

            <Transition show={openCreateGoalModal} as={Fragment}>
                <Dialog as="div" onClose={setOpenCreateGoalModal} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("createGoalTitle", { ns: "goals" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("createGoalDescription", { ns: "goals" })}</Description>
                            <form className="flex flex-col gap-2 mt-2 mb-4" onSubmit={handleAddNewGoal}>
                                <IconInput inputId="newGoalDescription" icon={LucideScrollText} onChange={(e) => { setDescription(e.target.value) }}
                                    type="text" placeholder={t("goalDescriptionPlaceholder", { ns: "goals" })} 
                                    classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" label={t("goalDescriptionLabel", { ns: "goals" })}/>
                                <label htmlFor="goalType" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t("goalTypeLabel", { ns: "goals" })}</label>
                                <select
                                    id="goalType"
                                    className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                    onChange={(e) => setGoalType(e.target.value as GoalType)}
                                >
                                    <option value="None">{t("goalTypePlaceholder", { ns: "goals" })}</option>
                                    <option value="Weight">{t("weight", { ns: "goals" })}</option>
                                    <option value="BFP">{t("bfp", { ns: "goals" })}</option>
                                    <option value="BMI">{t("bmi", { ns: "goals" })}</option>
                                </select>
                                <IconInput inputId="newGoalTargetValue" icon={LucideGoal} onChange={(e) => { setTargetValue(parseFloat(e.target.value)) }}
                                    type="number" placeholder={t("goalTargetPlaceholder", { ns: "goals" })} 
                                    classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" label={t("goalTargetLabel", { ns: "goals" })}/>
                                <label htmlFor="goalDirectionType" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t("goalDirectionLabel", { ns: "goals" })}</label>
                                <select
                                    id="goalDirectionType"
                                    className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                    onChange={(e) => setGoalDirection(e.target.value as GoalDirection)}
                                >
                                    <option value="None">{t("goalDirectionPlaceholder", { ns: "goals" })}</option>
                                    <option value="Increase">{t("increase", { ns: "goals" })}</option>
                                    <option value="Decrease">{t("decrease", { ns: "goals" })}</option>
                                    <option value="Maintain">{t("maintain", { ns: "goals" })}</option>
                                </select>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">{t("goalDateLabel", { ns: "goals" })}</label>
                                <div className="relative w-full">
                                    <LucideCalendar className="absolute left-2 top-5 -translate-y-1/2 w-6 h-6 text-gray-300"></LucideCalendar>
                                    <input id="date" type="text" placeholder={`${goalDate != null ? formatDate(goalDate) : t("goalDatePlaceholder", { ns: "goals"})}`} className="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" 
                                        onClick={() => setOpenCalendar(!openCalendar)} />
                                </div>
                                <DayPicker className={`text-black ${openCalendar ? '' : 'hidden'}`}
                                    animate mode="single" onSelect={handleDateSelect} startMonth={new Date()} endMonth={new Date(new Date().getFullYear() + 3, 11, 31)}
                                    captionLayout="dropdown" locale={i18n.language == "en" ? enUS : es}
                                />
                                <IconButton label={t("saveGoal", { ns: "goals" })} icon={LucideCheck}
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

            <Transition show={openEditGoalModal} as={Fragment}>
                <Dialog as="div" onClose={setOpenEditGoalModal} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("editGoalTitle", { ns: "goals" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("editGoalDescription", { ns: "goals" })}</Description>
                            <form className="flex flex-col gap-4 mt-2 mb-4" onSubmit={handleEditGoal}>
                                <IconInput inputId="newGoalDescription" icon={LucideScrollText} onChange={(e) => { setDescription(e.target.value) }}
                                    type="text" placeholder={t("goalDescriptionPlaceholder", { ns: "goals" })} value={currentDescription}
                                    classname={"pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500"} label={t("goalDescriptionLabel", { ns: "goals" })}/>
                                <label htmlFor="goalEditType" className="block mb-2 text-sm font-medium text-gray-700">{t("goalTypeLabel", { ns: "goals" })}</label>
                                <select
                                    id="goalEditType" value={getNormalizedString(currentGoalType)}
                                    className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                    onChange={(e) => setGoalType(e.target.value as GoalType)}
                                >
                                    <option value="None">{t("goalTypePlaceholder", { ns: "goals" })}</option>
                                    <option value="Weight">{t("weight", { ns: "goals" })}</option>
                                    <option value="BFP">{t("bfp", { ns: "goals" })}</option>
                                    <option value="BMI">{t("bmi", { ns: "goals" })}</option>
                                </select>
                                <IconInput inputId="newGoalTargetValue" icon={LucideGoal} onChange={(e) => { setTargetValue(parseFloat(e.target.value)) }}
                                    type="number" placeholder={t("goalTargetPlaceholder", { ns: "goals" })} value={currentTargetValue}
                                    classname={"pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500"} label={t("goalTargetLabel", { ns: "goals" })}/>
                                
                                <label htmlFor="goalEditDirectionType" className="block mb-2 text-sm font-medium text-gray-700">{t("goalDirectionLabel", { ns: "goals" })}</label>
                                <select
                                    id="goalEditDirectionType" value={getNormalizedString(currentGoalDirection)}
                                    className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                    onChange={(e) => setGoalDirection(e.target.value as GoalDirection)}
                                >
                                    <option value="None">{t("goalDirectionPlaceholder", { ns: "goals" })}</option>
                                    <option value="Increase">{t("increase", { ns: "goals" })}</option>
                                    <option value="Decrease">{t("decrease", { ns: "goals" })}</option>
                                    <option value="Maintain">{t("maintain", { ns: "goals" })}</option>
                                </select>
                                <label htmlFor="dateEdit" className="block mb-2 text-sm font-medium text-gray-700">{t("goalDateLabel", { ns: "goals" })}</label>
                                <div className="relative w-full">
                                    <LucideCalendar className="absolute left-2 top-5 -translate-y-1/2 w-6 h-6 text-gray-300"></LucideCalendar>
                                    <input id="dateEdit" type="text" placeholder={`${currentGoalDate != null ? formatDate(currentGoalDate) : t("goalDatePlaceholder", { ns: "goals"})}`} className="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" 
                                        onClick={() => setOpenCalendar(!openCalendar)} />
                                </div>
                                <DayPicker className={`text-black ${openCalendar ? '' : 'hidden'}`}
                                    animate mode="single" onSelect={handleDateSelect} selected={currentGoalDate} startMonth={new Date()} endMonth={new Date(new Date().getFullYear() + 3, 11, 31)}
                                    captionLayout="dropdown" locale={i18n.language == "en" ? enUS : es}
                                />
                                <IconButton label={t("saveGoal", { ns: "goals" })} icon={LucideCheck}
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

            <Transition show={openDeleteGoalModal} as={Fragment}>
                <Dialog as="div" onClose={setOpenDeleteGoalModal} className="relative z-2">
                    <div className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="w-80 max-w-md lg:w-full transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle className="text-xl font-bold text-black dark:text-gray-100">{t("deleteGoalTitle", { ns: "goals" })}</DialogTitle>
                            <Description className="text-black dark:text-gray-100">{t("deleteGoalDescription", { ns: "goals" })}</Description>
                            <div className="flex flex-row mt-4 w-full justify-center items-center gap-4">
                                <IconButton
                                    icon={LucideCheckCheck}
                                    label={t("delete", { ns: "goals" })}
                                    classname="flex justify-center items-center gap-2 !bg-blue-700 text-white"
                                    onClick={handleDeleteGoal}
                                />
                                <IconButton
                                    icon={LucideBan}
                                    label={t("cancel", { ns: "goals" })}
                                    classname="flex justify-center items-center gap-2 !bg-red-700 text-white"
                                    onClick={() => { setOpenDeleteGoalModal(false) }}
                                />
                            </div>
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

export default Goals;