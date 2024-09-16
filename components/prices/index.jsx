import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname } from "next/navigation";

function PriceSection({t}) {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Get the first segment or the only one if there's just one
  const firstPathSegment =
    pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";
  return (
    <Tabs defaultValue="monthly" className="w-full mt-5">
      <div className="flex justify-center w-full">
        <TabsList className="w-fit">
          <TabsTrigger value="monthly">{t("Oylik")}</TabsTrigger>
          <TabsTrigger value="yearly">
            <span>{t("Yillik")}</span>
            <span className="bg-blue-400 rounded-lg text-black py-1 px-2 ml-2 text-xs">+{t("Chegirma")}</span>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="monthly" className="w-fit bg-transparent h-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto w-full justify-center">
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Free trial</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("free plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">0</b> UZS / 10 {t("kun")}
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Standart</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("standart plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">300 000</b> UZS / 30 {t("kun")}
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {" "}
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'llab-quvvatlash")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Business</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("business plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">400 000</b> UZS / 30 {t("kun")}
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {" "}
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'llab-quvvatlash")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'shimcha agent dasturi")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="yearly" className="w-fit bg-transparent h-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto w-full justify-center">
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Free trial</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("free plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">0</b> UZS / 10 {t("kun")}
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Standart</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("standart plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">2 500 000</b> UZS / 365 {t("kun")}
              
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {" "}
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'llab-quvvatlash")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
          <div className="border-2 border-border rounded-lg w-full lg:w-80 p-4 bg-white h-fit">
            <h4 className="text-lg font-bold">Business</h4>
            <p className="text-xs text-muted-foreground mb-3">
              {t("business plan text")}
            </p>
            <span className="text-black text-xs">
              <b className="text-3xl font-bold">3 500 000</b> UZS / 365
              kun
            </span>
            <div className="mt-5 py-5 border-t space-y-1">
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Sotuvlar bo'yicha hisobotlar")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {t("Mijozlar bilan aloqa boshqaruvi")} (CRM)
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">
                  {" "}
                  {t("Savdo jarayonlarini avtomatlashtirish")}
                </small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className=""> {t("Real vaqt tahlillari")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Ma'lumotlar xavfsizligi")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'llab-quvvatlash")}</small>
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                <small className="">{t("Qo'shimcha agent dasturi")}</small>
              </span>
            </div>
            <Link href={`${firstPathSegment}/contact`}>
              <Button className="w-full">{t("Tarifni tanlash")}</Button>
            </Link>
          </div>
        </div>
      </TabsContent>
      
    </Tabs>
  );
}

export default PriceSection;
