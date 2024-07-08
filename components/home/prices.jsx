"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { Check, Lock } from "lucide-react";
import { Button } from "../ui/button";

function Price() {
  return (
    <section id="price" className="py-10 md:py-16 bg-[#171717]">
      <div className="w-full">
        <h2 className="text-clamp-title items-center text-center text-white">
          <span className="text-muted-foreground">Pricing.</span>
          <br />
          Our wall of love.
        </h2>
      </div>
      <Tabs defaultValue="yearly" className="w-full mt-5">
        <div className="flex justify-center w-full">
          <TabsList className="w-fit">
            <TabsTrigger value="yearly">
              <span>Yearly</span>{" "}
              <Badge className="ml-2 text-xs bg-primary">-10%</Badge>
            </TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="yearly" className="bg-transparent h-fit">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full max-w-80 p-4 bg-white h-fit">
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
              <Button className="w-full">Get started</Button>
            </div>
            <div className="border-2 border-border rounded-lg w-full max-w-80 p-4 bg-white h-fit">
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
              <Button className="w-full">Get started</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="bg-transparent h-fit">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mx-auto w-full justify-center">
            <div className="border-2 border-border rounded-lg w-full max-w-80 p-4 bg-white h-fit">
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
              <Button className="w-full">Get started</Button>
            </div>
            <div className="border-2 border-border rounded-lg w-full max-w-80 p-4 bg-white h-fit">
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
              <Button className="w-full">Get started</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center px-4 gap-2 text-white w-full mx-auto mt-5">
        <Lock className="w-4 h-4" />
        <small>
          Secure payment. Cancel anytime. 100% money back guarantee.
        </small>
      </div>
    </section>
  );
}

export default Price;
