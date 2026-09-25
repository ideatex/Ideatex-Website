"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import "./animated-service-card.css";

// --- Carousel Context ---
const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

// --- Main Carousel Component ---
const Carousel = React.forwardRef(
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

    const onSelect = React.useCallback((api) => {
      if (!api) return;
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
      (event) => {
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
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
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
          orientation,
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

// --- Carousel Content ---
const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

// --- Carousel Item ---
const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

// --- Carousel Controls ---
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-10 w-10 rounded-full",
          "right-2 top-1/2 -translate-y-1/2",
          className
        )}
        onClick={scrollNext}
        disabled={!canScrollNext}
        {...props}
      >
        <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

// Sub-component for individual cards with Glassy Effect and Background Image
const ServiceCard = ({ service, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const IconComponent = service.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex h-[450px] w-full flex-col justify-between overflow-hidden rounded-3xl p-8 group service-glass-card",
        service.gradient
      )}
    >
      {/* Background Image with Hover Scale */}
      {service.image && (
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
          style={{
            filter: "brightness(0.38) saturate(1.15) contrast(1.05)",
          }}
          loading="lazy"
        />
      )}

      {/* Glassmorphism & Vignette Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/35 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 z-[1] backdrop-blur-[6px] bg-[#0A0D14]/30 pointer-events-none transition-opacity duration-300 group-hover:opacity-70" />

      {/* Glass Top Rim Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-[2]" />

      {/* Card Content Top */}
      <div className="z-10 flex flex-col items-start text-left relative">
        <span className="mb-6 text-sm font-mono text-white/60 tracking-wider">
          ( {service.number} )
        </span>
        {IconComponent && (
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md text-accent shadow-lg group-hover:scale-105 group-hover:border-accent/40 transition-all duration-300">
            <IconComponent size={24} strokeWidth={1.75} aria-hidden="true" className="text-accent" />
          </div>
        )}
      </div>

      {/* Card Content Bottom */}
      <div className="z-10 relative">
        <h3 className="mb-2 text-xl font-bold uppercase tracking-wider text-white">
          {service.title}
        </h3>
        <p className="text-sm text-white/75 line-clamp-3 leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

// Main exportable component
export const ServiceCarousel = ({ services }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Carousel
        ref={ref}
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1 }}
        >
          <CarouselContent>
            {services.map((service, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <ServiceCard service={service} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>
        <CarouselNext className="bg-foreground/10 border-0 hover:bg-foreground/20 text-foreground" />
      </Carousel>
    </div>
  );
};

export { Carousel, CarouselContent, CarouselItem, CarouselNext, ServiceCard };
export default ServiceCarousel;
