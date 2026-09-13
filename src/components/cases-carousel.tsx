import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NotableCase } from "@/lib/firm-data";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const PRACTICE_SYMBOLS: Record<string, string> = {
  "Litigation & Arbitration": "⚖️",
  "Corporate & M&A": "🏢",
  "Maritime & Shipping": "🚢",
  "Energy & Natural Resources": "⚡",
  "Banking & Finance": "🏦",
  "Regulatory & Investigations": "🛡️",
  "Real Estate & Infrastructure": "🏗️",
};

export function CasesCarousel({ cases }: { cases: NotableCase[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);

  const updateSelected = useCallback((carouselApi: CarouselApi) => {
    if (carouselApi) setSelected(carouselApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    updateSelected(api);
    api.on("select", updateSelected);
    api.on("reInit", updateSelected);
    return () => {
      api.off("select", updateSelected);
      api.off("reInit", updateSelected);
    };
  }, [api, updateSelected]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} aria-label="Notable cases">
      <CarouselContent className="-ml-5">
        {cases.map((item, index) => (
          <CarouselItem key={item.title} className="basis-[92%] pl-5 md:basis-[72%] lg:basis-[58%]">
            <article
              className={`flex h-full min-h-80 flex-col border bg-background p-7 transition-[opacity,transform] duration-700 md:min-h-96 md:p-10 ${
                selected === index ? "border-accent opacity-100" : "border-border opacity-55"
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-4xl" aria-hidden="true">
                  {PRACTICE_SYMBOLS[item.practice] ?? "§"}
                </span>
                <span className="font-display text-3xl text-accent">{item.year}</span>
              </div>
              <p className="rule-label mt-8 text-accent">{item.practice}</p>
              <h3 className="mt-3 max-w-xl text-3xl leading-tight md:text-4xl">{item.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{item.detail}</p>
              <p className="mt-auto pt-8 text-sm font-semibold text-foreground">{item.outcome}</p>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex items-center justify-between gap-6">
        <p className="rule-label shrink-0 whitespace-nowrap text-muted-foreground" aria-live="polite">
          {String(selected + 1).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
        </p>
        <div className="hidden items-center gap-2 sm:flex">
          {cases.map((item, index) => (
            <Button
              key={item.title}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Go to case ${index + 1}`}
              aria-current={selected === index ? "true" : undefined}
              onClick={() => api?.scrollTo(index)}
              className="h-7 w-7 rounded-full p-0 hover:bg-transparent"
            >
              <span
                className={`block h-1 transition-all duration-500 ${selected === index ? "w-6 bg-accent" : "w-2 bg-border"}`}
              />
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="icon" onClick={() => api?.scrollPrev()} aria-label="Previous case">
            <ArrowLeft />
          </Button>
          <Button type="button" variant="outline" size="icon" onClick={() => api?.scrollNext()} aria-label="Next case">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </Carousel>
  );
}