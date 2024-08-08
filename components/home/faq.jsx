/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    value: "item-1",
    title: "Menga qaysi tarif mos keladi?",
    desc: "Sizga mos keladigan tarifni aniqlash konsultanlarimizga murojaat qiling, ular biznesingizni baholashga va eng yaxshi tarifni tanlashga yordam beradi. Konsultanlar bilan bog'lanish uchun havola bo'ylab o'ting",
  },
  {
    value: "item-2",
    title:
      "Agar Inreport System menga mos kelmasa-chi? Tarifni sotib olishdan oldin sinab ko'rishim mumkinmi?",
    desc: "Barcha tariflar uchun 10 kunlik bepul sinov muddatibelgilangan, ushbu muddat davomida dasturning imkoniyatlarini to'liq baholashingiz va biznesingiz uchun mos keladigan xususiyatlarni tanlashingiz mumkin. Agar Inreport System biznesingizga mos kelmasa, 10 kunlik sinov muddatidan so'ng hech qanday to'lovsiz ishlatishni to'xtatishingiz mumkin.",
  },
  {
    value: "item-3",
    title:
      "Nima uchun men dasturni darhol sotib ololmayman va nega oylik abonent to'lovini to'lashim kerak??",
    desc: "Dastur ijara shaklida tadim etiladi, shu sabali serverlarni sotib olish, o'rnatish va xodimlarni o'rgatish uchun ko'p pul sarflashingiz shart emas. Inreport Systems jamoasi ilovaning texnik qismiga to‘liq xizmat ko'rsatadi, mijozlarni qo‘llab-quvvatlaydi va o‘qitadi, tizimni doimiy ravishda takomillashtiradi va funksionallikni boyitib boradi.",
  },
  {
    value: "item-3",
    title:
      "Agar do'konlarim soni 10 tadan ortiq bo'lsa, chegirmalar taqdim etiladimi?",
    desc: "Bir yil yoki undan ko'proq muddatga to'langanda 20% chegirma taqdim etiladi. Shu bilan birga, agar savdo nuqtalaringiz soni 10 dan ortiq bo'lsa, narxlar va ulanish shartlari alohida muhokama qilinishi mumkin.",
  },
  {
    value: "item-4",
    title: "Tariflar bir-biridan nimalar bilan farq qiladi?",
    desc: "Tariflar funksional to'plami bilan farq qiladi, shuningdek, foydalanuvchilar soni ham farqlanadi. Misol uchun, agar siz endigina chakana biznesni boshlagan bo'lsangiz va bitta do'konni boshqarsangiz, Start rejasi siz uchun mos keladi. Agar siz katta tarmoqqa ega bo'lsangiz va avtomatlashtirish jarayonini to'liq sozlashni va ilg'or statistik ma'lumotlarni olishni istasangiz, sizga Bussines tarifi mos keladi.",
  },
  {
    value: "item-5",
    title:
      "Inreport System tizimiga ulanish va tarifni tanlash uchun nima qilish kerak?",
    desc: "Shunchaki Bepul Demo bo'limiga o'ting va dasturdan foydalanib ko'ring. Ma'qul kelsa, 10 kun ichida to'lovni amalga oshiring.",
  },
];

function FAQ() {
  return (
    <section className="container mx-auto my-10 md:my-16 max-w-4xl">
      <h2 className="text-clamp-title items-center text-center mt-10 mb-5">
        Ko&apos;p beriladigan
        <span className="text-muted-foreground"> savollar</span>
      </h2>
      <Accordion className="mt-10 space-y-2" type="single" collapsible>
        {faqData.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="text-left text-lg font-semibold">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent>{faq.desc}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQ;
