import {
    LucideArrowLeft, LucideCalendar, LucideChartLine,
    LucideCheckCheck,
    LucideDumbbell, LucideIdCard, LucideLock, LucideMail,
    LucideRuler, LucideShield, LucideShieldAlert, LucideTrophy,
    LucideUser, LucideUserPlus, type LucideIcon
} from "lucide-react";
import Header from "../components/Public/Header";
import IconInput from "../components/ui/IconInput";
import FeatureIcon from "../components/ui/FeatureIcon";
import AlertBlock from "../components/ui/AlertBlock";
import { IconButton } from "../components/ui/IconButton";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { enUS, es } from "react-day-picker/locale";
import "react-day-picker/dist/style.css";
import { useTranslation } from "react-i18next";
import { userApi } from "../api/rest/userApi";
import type { UserRegistrationRequest } from "../types/dto/UserRegistrationRequest";
import type { Alert } from "../types/general/AlertType";
import type { Gender } from "../types/general/GenderType";
import { genderMap } from "../utils/genderMapper";

function FormatDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [dateBirth, setDateBirth] = useState<Date>();
    const [height, setHeight] = useState<number>(0);
    const [gender, setGender] = useState<Gender>("None");
    const [agree, setAgree] = useState<Boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<Alert>("Tip");
    const [icon, setIcon] = useState<LucideIcon>(LucideShield);
    const [openCalendar, setOpenCalendar] = useState<Boolean>(false);
    const {t, i18n} = useTranslation(["register", "common", "password"]);
    const navigate = useNavigate();
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[^A-Za-z0-9]/;

    const handleDateSelect = (date?: Date) => {
        setDateBirth(date);
        setOpenCalendar(!openCalendar);
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (!agree) {
            setAlertType("Error");
            setTitle("");
            setMessage(t("agreeValidation"));
            setIcon(LucideShieldAlert);
            return;
        }
        if(gender == "None") {
            setAlertType("Error");
            setTitle("");
            setMessage(t("genderValidation"));
            setIcon(LucideShieldAlert);
            return;
        }
        const payload = {
            userName: username,
            password: password,
            email: email,
            name: name,
            lastName: lastname,
            dateOfBirth: dateBirth?.toISOString().split("T")[0],
            height: height,
            gender: genderMap[gender]
        }
        try {
            const response = await userApi.register(payload as UserRegistrationRequest);
            setTitle("");
            setMessage(response.message);
            setAlertType("Success");
            setIcon(LucideCheckCheck);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
        catch (error: any) {
            setTitle(error.message)
            setMessage(error.details != undefined ? error.details : error.message)
            setAlertType("Error");
            setIcon(LucideShieldAlert);
        }
    }

    const checkPasswordValidity = () => {
        if (confirmPassword != password) {
            setAlertType("Error");
            setTitle(t("passwordRequirements", { ns: "password" }));
            setMessage(t("passwordSameError", { ns: "password" }));
            setIcon(LucideShield);
        }
        else {
            setTitle("");
            setMessage("");
        }
    }

    const checkPasswordRequirements = () => {
        setTitle("");
        setMessage("");
        let messages = []
        if (password.length < 10) {
            messages.push(`• ${t("charactersValidation", { ns: "password" })}`);
        }
        if (!hasUppercase.test(password)) {
            messages.push(`• ${t("upperCaseValidation", { ns: "password" })}`);
        }
        if (!hasLowercase.test(password)) {
            messages.push(`• ${t("lowerCaseValidation", { ns: "password" })}`);
        }
        if (!hasNumber.test(password)) {
            messages.push(`• ${t("numberValidation", { ns: "password" })}`);
        }
        if (!hasSpecialChar.test(password)) {
            messages.push(`• ${t("specialCharValidation", { ns: "password" })}`);
        }

        setAlertType("Tip");
        setTitle(t("passwordRequirements", { ns: "password" }));
        setMessage(messages.reverse().join('\n'));
        setIcon(LucideShield);
    }

    useEffect(() => {
        checkPasswordRequirements();
    }, [password])

    useEffect(() => {
        checkPasswordValidity();
    }, [confirmPassword])

    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center justify-center py-5 gap-12 lg:gap-6">
                <Header subtitle={t("registerHeaderMessage")} />
                <div className="flex flex-row w-full gap-4">
                    <LucideArrowLeft className="text-gray-500"></LucideArrowLeft>
                    <Link to="/login" className="!text-gray-500">{t("backLogin", { ns: "common" })}</Link>
                </div>
                <section className="flex flex-col items-start justify-center bg-white rounded-md shadow-xl p-6">
                    <div className="flex flex-col gap-2 w-90">
                        <p className="text-black text-left font-bold text-2xl">{t("createAccount")}</p>
                        <p className="text-gray-500 whitespace-pre-line">{t("registerSubtitle")}</p>
                    </div>
                    <div>
                        <form className="flex flex-col w-90 mt-4 gap-2" onSubmit={handleRegister}>
                            <div>
                                <IconInput inputId="username" onChange={(e) => { setUsername(e.target.value) }} icon={LucideUser} type="text"
                                    placeholder={t("usernamePlaceholder")} label={t("usernameLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="email" onChange={(e) => { setEmail(e.target.value) }} icon={LucideMail} type="email"
                                    placeholder={t("emailPlaceholder", { ns: "common" })} label={t("emailLabel", { ns: "common" })} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="password" onChange={(e) => { setPassword(e.target.value) }} icon={LucideLock} type="password"
                                    placeholder={t("passwordPlaceholder")} label={t("passwordLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }} icon={LucideLock} type="password"
                                    placeholder={t("confirmPasswordPlaceholder")} label={t("confirmPasswordLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="name" onChange={(e) => { setName(e.target.value) }} icon={LucideIdCard} type="text"
                                    placeholder={t("namePlaceholder")} label={t("nameLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <IconInput inputId="lastname" onChange={(e) => { setLastname(e.target.value) }} icon={LucideIdCard} type="text"
                                    placeholder={t("lastNamePlaceholder")} label={t("lastNameLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">{t("birthLabel")}</label>
                                <div className="relative w-full">
                                    <LucideCalendar className="absolute left-2 top-5 -translate-y-1/2 w-6 h-6 text-gray-300"></LucideCalendar>
                                    <input id="date" type="text" placeholder={`${dateBirth != null ? FormatDate(dateBirth) : t("birthPlaceholder")}`} className="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" onClick={() => setOpenCalendar(!openCalendar)} />
                                </div>
                                <DayPicker className={`text-black ${openCalendar ? '' : 'hidden'}`}
                                    animate mode="single" selected={dateBirth} onSelect={handleDateSelect}
                                    captionLayout="dropdown" locale={i18n.language == "en" ? enUS : es}/>
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700">{t("genderLabel")}</label>
                                <select
                                    id="gender"
                                    className="p-2 mb-2 border rounded bg-white w-full border-gray-200 text-gray-500"
                                    onChange={(e) => setGender(e.target.value as Gender)}
                                >
                                    <option value="None">{t("genderPlaceholder")}</option>
                                    <option value="Male">{t("male")}</option>
                                    <option value="Female">{t("female")}</option>
                                </select>
                                <IconInput inputId="height" onChange={(e) => { setHeight(parseInt(e.target.value)) }}
                                    icon={LucideRuler} type="number" placeholder={t("heightPlaceholder")} label={t("heightLabel")} classname="pl-10 w-full p-2 mb-2 border border-gray-200 rounded text-gray-500" />
                            </div>
                            <div className="flex flex-row items-center justify-center text-left gap-2 w-full">
                                <input id="agree" type="checkbox" className="bg-white accent-sky-600" onChange={() => { setAgree(!agree) }}></input>
                                <label htmlFor="agree" className="text-black text-sm">
                                    {t("agree")} <Link to="/privacy-terms" className="text-sm !text-blue-600">{t("privacyTerms")}</Link>
                                </label>
                            </div>
                            <IconButton label={t("createAccount")} icon={LucideUserPlus}
                                classname="flex items-center justify-center text-white w-full gap-4 font-medium bg-linear-to-r from-sky-600 to-blue-800" />
                        </form>
                    </div>
                </section>

                {message && <AlertBlock icon={icon}
                    title={title as string}
                    body={message}
                    type={alertType} />}
                <section className="flex items-center gap-2">
                    <p className="text-gray-500">{t("alreadyAccount")}</p>
                    <Link to="/login" className="text-sm !text-blue-600">{t("signIn", { ns: "common" })}</Link>
                </section>

                <section className="flex flex-row gap-10">
                    <FeatureIcon label={t("trackProgressFeature", { ns: "common" })} icon={LucideChartLine}
                        classname="bg-blue-100 rounded-full w-10 h-10 flex justify-center items-center text-blue-500" />
                    <FeatureIcon label={t("customWorkoutFeature", { ns: "common" })}
                        icon={LucideDumbbell} classname="bg-orange-100 rounded-full w-10 h-10 flex justify-center items-center text-orange-500" />
                    <FeatureIcon label={t("achievementsFeature", { ns: "common" })}
                        icon={LucideTrophy} classname="bg-green-100 rounded-full w-10 h-10 flex justify-center items-center text-green-500" />
                </section>
            </div>
        </div>
    );
}

export default Register;