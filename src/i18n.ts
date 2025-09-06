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

i18n
  .use(initReactI18next)
  .init({
    ns: ["common", "login", "password", "register", "home", "settings"],
    defaultNS: "common",
    resources: {
      en: {  
        common: commonEn,
        login: loginEn,
        password: passwordEn,
        register: registerEn,
        home: homeEn,
        settings: settingsEn
      },
      es: {
        common: commonEs,
        login: loginEs,
        password: passwordEs,
        register: registerEs,
        home: homeEs,
        settings: settingsEs
      },
    },
    lng: "es", // Default
    fallbackLng: "en", // If the resource cannot be found
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
