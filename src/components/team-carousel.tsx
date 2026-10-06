import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  focus: string;
  photo: string;
};

export function TeamCarousel({ members }: { members: TeamMember[] }) {
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
    <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} aria-label="Meet our team">
      <CarouselContent className="-ml-5">
        {members.map((member, index) => (
          <CarouselItem key={member.slug} className="basis-[86%] pl-5 sm:basis-[58%] lg:basis-[36%]">
            <Link to="/attorneys" className="group block h-full focus-visible:outline-2 focus-visible:outline-accent">
              <article
                className={`relative h-full min-h-[30rem] overflow-hidden border bg-ink transition-[opacity,transform,border-color] duration-700 sm:min-h-[34rem] ${
                  selected === index ? "border-accent opacity-100" : "border-border opacity-100"
                }`}
              >
                <img
                  src={member.photo}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--ink)_0%,color-mix(in_oklab,var(--ink)_68%,transparent)_34%,transparent_70%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ink-foreground sm:p-8">
                  <p className="rule-label text-accent">{member.focus}</p>
                  <h3 className="mt-3 text-3xl leading-tight sm:text-4xl">{member.name}</h3>
                  <p className="mt-2 text-sm text-ink-foreground/75">{member.role}</p>
                </div>
              </article>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5">
        <p className="rule-label min-w-0 text-muted-foreground" aria-live="polite">
          {String(selected + 1).padStart(2, "0")} / {String(members.length).padStart(2, "0")}
        </p>
        <div className="flex shrink-0 gap-2">
          <Button type="button" variant="outline" size="icon" onClick={() => api?.scrollPrev()} aria-label="Previous attorney">
            <ArrowLeft />
          </Button>
          <Button type="button" variant="outline" size="icon" onClick={() => api?.scrollNext()} aria-label="Next attorney">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </Carousel>
  );
}