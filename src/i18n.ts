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

i18n
  .use(initReactI18next)
  .init({
    ns: ["common", "login", "password", "register"],
    defaultNS: "common",
    resources: {
      en: {  
        common: commonEn,
        login: loginEn,
        password: passwordEn,
        register: registerEn
      },
      es: {
        common: commonEs,
        login: loginEs,
        password: passwordEs,
        register: registerEs
      },
    },
    lng: "es", // Default
    fallbackLng: "en", // If the resource cannot be found
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
