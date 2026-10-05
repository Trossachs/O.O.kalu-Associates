import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import fallbackCaseImage from "@/assets/hero-cases.jpg";
import type { NotableCase } from "@/lib/firm-data";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

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
              className={`grid h-full min-h-[32rem] overflow-hidden border bg-background transition-[opacity,transform] duration-700 md:min-h-[28rem] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] ${
                selected === index ? "border-accent opacity-100" : "border-border opacity-55"
              }`}
            >
              <div className="relative min-h-56 overflow-hidden bg-ink md:min-h-full">
                <img
                  src={item.image ?? fallbackCaseImage}
                  alt={`${item.practice} case`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-col p-7 md:p-10">
                <span className="font-display text-3xl text-accent">{item.year}</span>
                <p className="rule-label mt-7 text-accent">{item.practice}</p>
                <h3 className="mt-3 max-w-xl text-3xl leading-tight md:text-4xl">{item.title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{item.detail}</p>
                <p className="mt-auto pt-8 text-sm font-semibold text-foreground">{item.outcome}</p>
              </div>
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