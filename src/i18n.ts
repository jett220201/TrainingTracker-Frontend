import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "./i18n/en/common.json";
import loginEn from "./i18n/en/login.json";
import passwordEn from "./i18n/en/password.json";
import registerEn from "./i18n/en/register.json";
import commonEs from "./i18n/es/common.json";
import loginEs from "./i18n/es/login.json";
import passwordEs from "./i18n/es/password.json";
import registerEs from "./i18n/es/register.json";
import homeEn from "./i18n/en/home.json";
import homeEs from "./i18n/es/home.json";
import settingsEn from "./i18n/en/settings.json";
import settingsEs from "./i18n/es/settings.json";
import aboutEn from "./i18n/en/about.json";
import aboutEs from "./i18n/es/about.json";
import profileEn from "./i18n/en/profile.json";
import profileEs from "./i18n/es/profile.json";
import exercisesEn from "./i18n/en/exercises.json";
import exercisesEs from "./i18n/es/exercises.json";
import progressEn from "./i18n/en/progress.json";
import progressEs from "./i18n/es/progress.json";
import goalsEn from "./i18n/en/goals.json";
import goalsEs from "./i18n/es/goals.json";
import workoutsEn from "./i18n/en/workouts.json";
import workoutsEs from "./i18n/es/workouts.json";

i18n
  .use(initReactI18next)
  .init({
    ns: ["common", "login", "password", "register", 
          "home", "settings", "about", "profile", 
          "exercises", "progress", "goals", "workouts"],
    defaultNS: "common",
    resources: {
      en: {  
        common: commonEn,
        login: loginEn,
        password: passwordEn,
        register: registerEn,
        home: homeEn,
        settings: settingsEn,
        about: aboutEn,
        profile: profileEn,
        exercises: exercisesEn,
        progress: progressEn,
        goals: goalsEn,
        workouts: workoutsEn
      },
      es: {
        common: commonEs,
        login: loginEs,
        password: passwordEs,
        register: registerEs,
        home: homeEs,
        settings: settingsEs,
        about: aboutEs,
        profile: profileEs,
        exercises: exercisesEs,
        progress: progressEs,
        goals: goalsEs,
        workouts: workoutsEs
      },
    },
    lng: "es", // Default
    fallbackLng: "en", // If the resource cannot be found
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
