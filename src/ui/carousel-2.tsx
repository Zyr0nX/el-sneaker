"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

import { cn } from "~/utils/shadcn";
import { Button } from "~/ui/button";
import Autoplay from "~/components/Autoplay";
import { Image } from "~/utils/sanity/image";
import { ScrollArea } from "./scroll-area";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [items, setItems] = React.useState<React.ReactNode[]>([]);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselAutoplay = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Carousel>
>((props, ref) => {
  return (
    <Carousel
      {...props}
      plugins={[
        ...(props.plugins || []),
        Autoplay({
          delay: 5000,
        }),
      ]}
      ref={ref}
    />
  );
});
CarouselAutoplay.displayName = "CarouselAutoplay";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "secondary", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full bg-neutral-100 flex justify-center items-center",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className="h-6 w-6 text-neutral-50" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "secondary", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full bg-neutral-100 flex justify-center items-center",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRightIcon className="h-6 w-6 text-neutral-50" />
      <span className="sr-only">Next slide</span>
    </button>
  );
});

type PropType = React.ComponentPropsWithRef<"button">;

export const DotButtons: React.FC<PropType> = (props) => {
  const { api } = useCarousel();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  const onInit = React.useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!api) return;

    onInit(api);
    onSelect(api);
    api.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [api, onInit, onSelect]);

  return (
    <div className="flex gap-2 absolute bottom-8 left-1/2 -translate-x-1/2">
      {scrollSnaps.map((_, index) => (
        <Button
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            "w-3 h-3 rounded-full px-0 py-0",
            index === selectedIndex ? "bg-brand-500" : "bg-white"
          )}
        />
      ))}
    </div>
  );
};

CarouselNext.displayName = "CarouselNext";

export const Thumbs = ({
  images,
}: {
  images: {
    key: string;
    ref: string | null;
  }[];
}) => {
  const { api } = useCarousel();

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!api || !emblaThumbsApi) return;
    setSelectedIndex(api.selectedScrollSnap());
    emblaThumbsApi.scrollTo(api.selectedScrollSnap());
  }, [api, emblaThumbsApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!api) return;
    onSelect();

    api.on("select", onSelect).on("reInit", onSelect);
  }, [api, onSelect]);

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!api || !emblaThumbsApi) return;
      api.scrollTo(index);
    },
    [api, emblaThumbsApi]
  );

  return (
    <div className="overflow-hidden" ref={emblaThumbsRef}>
      <div className="flex gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`flex-shrink-0 grow-0 basis-2/5 md:basis-1/5 max-w-32 rounded-lg overflow-hidden cursor-pointer ${index == selectedIndex ? "outline-2 outline outline-brand-300 -outline-offset-2" : ""}`}
            onClick={() => onThumbClick(index)}
          >
            <Image id={image.ref} alt="" className="object-cover w-fit" />
          </div>
        ))}
      </div>
    </div>
  );
};

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselAutoplay,
};
