import { useMainContext } from "@/context/main-context";
import React from "react";
import { useTranslations } from "next-intl";

function Compare() {
  const t = useTranslations();
  const { isVisible } = useMainContext();
  return (
    <div className="w-full container md:max-w-4xl mx-auto my-10 md:my-16">
      <h2 className="text-clamp-title items-center text-center mt-10 mb-5">
        {t("Rejalarni solishtiring")}
      </h2>

      <div
        className={`grid grid-cols-2 sticky px-4 py-3 lg:p-4 bg-white bg-opacity-50 backdrop-blur-sm z-50 duration-500 ${
          isVisible ? "top-20" : "top-0"
        }`}
      >
        <div />
        <div className="grid grid-cols-3">
          <h4 className="text-center text-xs md:text-base">Free trial</h4>
          <h4 className="text-center text-xs md:text-base">Standart</h4>
          <h4 className="text-center text-xs md:text-base">Business</h4>
        </div>
      </div>

      <div>
        <div className="p-2 md:p-3 bg-accent border-2 border-border rounded-lg w-full">
          <h4 className="text-xs md:text-base">{t("Umumiy xususiyatlar")}</h4>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-2 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Sotuvlar bo'yicha hisobotlar")}
          </p>
          <div className="grid grid-cols-3">
            <Check />
            <Check />
            <Check />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
          </p>
          <div className="grid grid-cols-3">
            <Check />
            <Check />
            <Check />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Savdo jarayonlarini avtomatlashtirish")}
          </p>
          <div className="grid grid-cols-3">
            <Check />
            <Check />
            <Check />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">{t("Real vaqt tahlillari")}</p>
          <div className="grid grid-cols-3">
            <Check />
            <Check />
            <Check />
          </div>
        </div>
      </div>

      <div>
        <div className="p-2 md:p-3 bg-accent border-2 border-border rounded-lg w-full">
          <h4 className="text-xs md:text-base">{t("Qo'shimcha xususiyatlar")}</h4>
        </div>

        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Ma'lumotlar xavfsizligi")}
          </p>
          <div className="grid grid-cols-3">
            <Check />
            <Check />
            <Check />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Qo'llab-quvvatlash")}
          </p>
          <div className="grid grid-cols-3">
            <Close />
            <Check />
            <Check />
          </div>
        </div>
        <div className="grid grid-cols-2 items-center px-4 py-3 lg:p-4">
          <p className="text-sm lg:text-lg font-medium">
            {t("Qo'shimcha agent dasturi")}
          </p>
          <div className="grid grid-cols-3">
            <Close />
            <Close />
            <Check />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;

function Check() {
  return (
    <div className="w-full flex justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 md:w-6 md:h-6 text-primary"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

function Close() {
  return (
    <div className="w-full flex justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}
