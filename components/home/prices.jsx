"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { Check, Lock } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function Price() {
  return (
    <section id="price" className="py-10 md:py-16 bg-primary">
      <div className="w-full">
        <h2 className="text-clamp-title items-center text-center text-white">
          <span className="text-muted-foreground">Narxlar.</span>
          <br />
          Mos tarifni tanlang.
        </h2>
      </div>
      <Tabs defaultValue="yearly" className="w-full mt-5">
        <div className="flex justify-center w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="yearly">
              <span>Yillik</span>
            </TabsTrigger>
            <TabsTrigger value="monthly">Oylik</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="yearly" className="bg-transparent h-fit">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Bepul (10 kun)</h4>
              <p className="text-xs text-muted-foreground mb-3">
                INREPORT platformasini sinab ko'rish uchun 10 kunlik bepul reja.
                Bu reja asosiy xususiyatlarni o'z ichiga oladi va
                foydalanuvchilarga dastur bilan tanishish imkoniyatini beradi.
              </p>
              <span className="text-black text-xs">
                <b className="text-5xl font-bold">0</b> so'm / 10 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Sotuvlar bo'yicha hisobotlar</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Savdo jarayonlarini avtomatlashtirish</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Real vaqt tahlillari
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Ma'lumotlar xavfsizligi</small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Standart</h4>
              <p className="text-xs text-muted-foreground mb-3">
              Ushbu reja kichik va o'rta bizneslar uchun mos bo'lib, barcha asosiy xususiyatlarni o'z ichiga oladi.
              </p>
              <span className="text-black text-xs">
                <b className="text-3xl font-bold">2 500 000</b> so'm / 365 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sotuvlar bo'yicha hisobotlar
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Savdo jarayonlarini avtomatlashtirish
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Real vaqt tahlillari</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Ma'lumotlar xavfsizligi
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'llab-quvvatlash
                  </small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Business</h4>
              <p className="text-xs text-muted-foreground mb-3">
              Katta bizneslar uchun mo'ljallangan reja. Standart rejadagi barcha xususiyatlardan tashqari, qo'shimcha agent dasturidan foydalanish imkoniyatini beradi.
              </p>
              <span className="text-black text-xs">
              <b className="text-3xl font-bold">3 500 000</b> so'm / 365 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sotuvlar bo'yicha hisobotlar
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Savdo jarayonlarini avtomatlashtirish
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Real vaqt tahlillari</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Ma'lumotlar xavfsizligi
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'llab-quvvatlash
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'shimcha agent dasturi
                  </small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="bg-transparent h-fit">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Bepul (10 kun)</h4>
              <p className="text-xs text-muted-foreground mb-3">
                INREPORT platformasini sinab ko'rish uchun 10 kunlik bepul reja.
                Bu reja asosiy xususiyatlarni o'z ichiga oladi va
                foydalanuvchilarga dastur bilan tanishish imkoniyatini beradi.
              </p>
              <span className="text-black text-xs">
                <b className="text-5xl font-bold">0</b> so'm / 10 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Sotuvlar bo'yicha hisobotlar</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Savdo jarayonlarini avtomatlashtirish</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Real vaqt tahlillari
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Ma'lumotlar xavfsizligi</small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Standart</h4>
              <p className="text-xs text-muted-foreground mb-3">
              Ushbu reja kichik va o'rta bizneslar uchun mos bo'lib, barcha asosiy xususiyatlarni o'z ichiga oladi.
              </p>
              <span className="text-black text-xs">
                <b className="text-3xl font-bold">300 000</b> so'm / 30 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sotuvlar bo'yicha hisobotlar
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Savdo jarayonlarini avtomatlashtirish
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Real vaqt tahlillari</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Ma'lumotlar xavfsizligi
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'llab-quvvatlash
                  </small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Business</h4>
              <p className="text-xs text-muted-foreground mb-3">
              Katta bizneslar uchun mo'ljallangan reja. Standart rejadagi barcha xususiyatlardan tashqari, qo'shimcha agent dasturidan foydalanish imkoniyatini beradi.
              </p>
              <span className="text-black text-xs">
              <b className="text-3xl font-bold">400 000</b> so'm / 30 kun
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sotuvlar bo'yicha hisobotlar
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Mijozlar bilan aloqa boshqaruvi (CRM)
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Savdo jarayonlarini avtomatlashtirish
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Real vaqt tahlillari</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Ma'lumotlar xavfsizligi
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'llab-quvvatlash
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                  Qo'shimcha agent dasturi
                  </small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center px-4 gap-2 text-white w-full mx-auto mt-5">
        <Lock className="w-4 h-4" />
        <small>Xavfsiz to&apos;lov tizimi. Istalgan vaqtda bekor qiling.</small>
      </div>
    </section>
  );
}

export default Price;
