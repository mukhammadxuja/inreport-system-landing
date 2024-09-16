"use client";
import { Lock } from "lucide-react";
import PriceSection from "../prices";

function Price({ pricePage = false, t }) {
  return (
    <section
      id="price"
      className={` ${
        pricePage
          ? "pt-24 pb-10 md:pt-24 lg:pt-36 bg-accent"
          : "py-10 md:py-16 bg-primary"
      }`}
    >
      <div className="w-full">
        <h2
          className={`${
            pricePage ? "text-primary" : "text-white"
          } text-clamp-title items-center text-center`}
        >
          <span className="text-muted-foreground ">{t("Narxlar")}.</span>
          <br />
          {t("Mos tarifni tanlang")}.
        </h2>
      </div>

      <PriceSection t={t}/>

      {!pricePage && (
        <div className="flex items-center justify-center px-4 gap-2 text-white w-full mx-auto mt-5">
          <Lock className="w-4 h-4" />
          <small>
            {t("Xavfsiz to'lov tizimi")}.
          </small>
        </div>
      )}
    </section>
  );
}

export default Price;
