import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Compare from "./compare";

function Price() {
  return (
    <div className="h-auto w-full pb-10 bg-accent">
      <h1 className="text-center w-full inline-block mt-24 mb-10 md:mt-24 tracking-[1.12] leading-[-.005em] text-clamp font-bold">
        <span className="text-muted-foreground">Narxlar.</span>
        <br />
        tarifni tanlang
      </h1>
      <Tabs defaultValue="yearly" className="w-full">
        <div className="flex justify-center w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="yearly">
              <span>Yillik</span> <Badge className="ml-2 text-xs">-10%</Badge>
            </TabsTrigger>
            <TabsTrigger value="monthly">Oylik</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="yearly" className="bg-transparent h-fit">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Free</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Starter plan to create your first screens and try everything
                Stage has to offer
              </p>
              <span className="text-black text-xs">
                $ <b className="text-5xl font-bold">0</b> / 7 days
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Create with rich text formatting.</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Use tags to organize and find notes easily.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Sync notes across up to 2 devices</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    500MB of cloud storage for all your notes.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Occasional in-app advertisements.</small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Professional</h4>
              <p className="text-xs text-muted-foreground mb-3">
                More power with unlimited library of templates and patterns for
                individuals or small teams
              </p>
              <span className="text-black text-xs">
                $ <b className="text-5xl font-bold">199</b> / 365 days
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sync notes across unlimited devices.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Access and edit your notes offline.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Access to 24/7 priority customer support.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Enjoy an ad-free experience.</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Personalize your interface with custom themes.
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Free</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Starter plan to create your first screens and try everything
                Stage has to offer
              </p>
              <span className="text-black text-xs">
                $ <b className="text-5xl font-bold">0</b> / 7 days
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Create with rich text formatting.</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Use tags to organize and find notes easily.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">Sync notes across up to 2 devices</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    500MB of cloud storage for all your notes.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Occasional in-app advertisements.</small>
                </span>
              </div>
              <Link href="/contact">
                <Button className="w-full">Tarifni tanlash</Button>
              </Link>
            </div>
            <div className="border-2 border-border rounded-lg w-full md:w-80 p-4 bg-white h-fit">
              <h4 className="text-lg font-bold">Professional</h4>
              <p className="text-xs text-muted-foreground mb-3">
                More power with unlimited library of templates and patterns for
                individuals or small teams
              </p>
              <span className="text-black text-xs">
                $ <b className="text-5xl font-bold">18</b> / 30 days
              </span>
              <div className="mt-5 py-5 border-t space-y-1">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Sync notes across unlimited devices.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Access and edit your notes offline.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    {" "}
                    Access to 24/7 priority customer support.
                  </small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className=""> Enjoy an ad-free experience.</small>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <small className="">
                    Personalize your interface with custom themes.
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
    </div>
  );
}

export default Price;
