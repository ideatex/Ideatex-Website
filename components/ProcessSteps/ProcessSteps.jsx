"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import SectionHeading from "../SectionHeading/SectionHeading";
import "./ProcessSteps.css";

// --- Helper Functions and Fallbacks ---

const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Placeholder for image assets if they are not found.
const placeholderImage = (text = "Image") =>
  `https://placehold.co/600x400/1a1a1a/ffffff?text=${text}`;

// --- Constants ---
const TOTAL_STEPS = 4;

export const steps = [
  {
    id: "1",
    name: "Step 1",
    title: "Understand",
    description: "We learn about your business, your audience and what you want to achieve.",
  },
  {
    id: "2",
    name: "Step 2",
    title: "Plan",
    description: "We identify the right approach, set priorities and agree on the work ahead.",
  },
  {
    id: "3",
    name: "Step 3",
    title: "Create & Build",
    description: "We bring the plan to life through creative production, marketing or development.",
  },
  {
    id: "4",
    name: "Step 4",
    title: "Refine",
    description: "We review the work, make improvements and prepare it for its intended use.",
  },
];

const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 },
  },
};

// --- Hooks ---
function useNumberCycler(totalSteps = TOTAL_STEPS, interval = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps);
    }, interval);

    return () => clearTimeout(timerId);
  }, [currentNumber, totalSteps, interval]);

  const setStep = useCallback((stepIndex) => {
    setCurrentNumber(stepIndex % totalSteps);
  }, [totalSteps]);

  return { currentNumber, setStep };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
  return isMobile;
}

// --- Components ---
function IconCheck({ className, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className={cn("h-4 w-4", className)} {...props}>
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

const stepVariants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
};

const StepImage = forwardRef(({ src, alt, className, style, ...props }, ref) => {
  return (
    <img
      ref={ref}
      alt={alt}
      className={className}
      src={src}
      style={{ position: "absolute", userSelect: "none", maxWidth: "unset", ...style }}
      onError={(e) => (e.currentTarget.src = placeholderImage(alt))}
      {...props}
    />
  );
});
StepImage.displayName = "StepImage";

const MotionStepImage = motion(StepImage);

const AnimatedStepImage = ({ preset = "fadeInScale", delay = 0, ...props }) => {
  const presetConfig = ANIMATION_PRESETS[preset];
  return <MotionStepImage {...props} {...presetConfig} transition={{ ...presetConfig.transition, delay }} />;
};

function FeatureCard({ children, step, customSteps = steps }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isMobile = useIsMobile();
  
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    if (isMobile) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const currentStepData = customSteps[step] || customSteps[0] || steps[0];

  return (
    <motion.div
      className="animated-cards group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={{ "--x": useMotionTemplate`${mouseX}px`, "--y": useMotionTemplate`${mouseY}px` }}
    >
      <div className="feature-card-inner relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="feature-card-content m-10 min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="feature-card-text flex w-full flex-col gap-4 md:w-3/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="feature-step-tag text-sm font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentStepData.name}
              </motion.div>
              <motion.h2
                className="feature-step-title text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentStepData.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="feature-step-desc text-base leading-relaxed text-neutral-700 dark:text-neutral-400">
                  {currentStepData.description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function StepsNav({ steps: stepItems, current, onChange }) {
  return (
    <nav aria-label="Progress" className="steps-nav-container flex justify-center px-4">
      <ol className="steps-nav-list flex w-full flex-wrap items-center justify-center gap-2" role="list">
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx;
          const isCurrent = current === stepIdx;
          return (
            <motion.li key={step.name || step.id || stepIdx} initial="inactive" animate={isCurrent ? "active" : "inactive"} variants={stepVariants} transition={{ duration: 0.3 }} className="relative">
              <button
                type="button"
                className={cn(
                  "steps-nav-btn group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-black",
                  isCurrent
                    ? "active bg-sky-600 text-white dark:bg-sky-500"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700",
                  isCompleted && "completed"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span
                  className={cn(
                    "steps-nav-badge flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted
                      ? "bg-sky-600 text-white dark:bg-sky-500"
                      : isCurrent
                      ? "bg-sky-400 text-sky-900 dark:bg-sky-400 dark:text-sky-900"
                      : "bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:group-hover:bg-neutral-600"
                  )}
                >
                  {isCompleted ? (
                    <IconCheck className="h-3.5 w-3.5" />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}

const defaultClasses = {
  img: "feature-img-card rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl shadow-black/10 dark:shadow-neutral-950/50",
  step1img1: "w-[50%] left-0 top-[15%]",
  step1img2: "w-[60%] left-[40%] top-[35%]",
  step2img1: "w-[50%] left-[5%] top-[20%]",
  step2img2: "w-[40%] left-[55%] top-[45%]",
  step3img: "w-[90%] left-[5%] top-[25%]",
  step4img: "w-[90%] left-[5%] top-[25%]",
};

const defaultImageSet = {
  step1img1: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&q=80&fit=crop", // Discovery Blueprint & Wireframing
  step1img2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&q=80&fit=crop", // Strategic Tech Roadmap Planning
  step2img1: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&q=80&fit=crop", // UI Design System & Component Library
  step2img2: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&q=80&fit=crop", // Architecture & Interactive Prototype
  step3img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1000&auto=format&q=80&fit=crop",  // High-Velocity Engineering & Code IDE
  step4img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&q=80&fit=crop",  // Production Launch Telemetry & Cloud Analytics
  alt: "Ideate X Product Engineering Delivery Process",
};

export function FeatureCarousel({
  image = defaultImageSet,
  customSteps = steps,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  ...props
}) {
  const currentImages = image || defaultImageSet;
  const currentSteps = customSteps || steps;
  const { currentNumber: step, setStep } = useNumberCycler(currentSteps.length);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt="Discovery and UX Architecture Blueprint" className={cn(defaultClasses.img, step1img1Class)} src={currentImages.step1img1} preset="slideInLeft" />
            <AnimatedStepImage alt="Product Roadmap and Milestone Planning" className={cn(defaultClasses.img, step1img2Class)} src={currentImages.step1img2} preset="slideInRight" delay={0.1} />
          </div>
        );
      case 1:
        return (
          <div className="relative w-full h-full">
            <AnimatedStepImage alt="UI Design System and Figma Component Library" className={cn(defaultClasses.img, step2img1Class)} src={currentImages.step2img1} preset="fadeInScale" />
            <AnimatedStepImage alt="Interactive Responsive Layouts and Architecture" className={cn(defaultClasses.img, step2img2Class)} src={currentImages.step2img2} preset="fadeInScale" delay={0.1} />
          </div>
        );
      case 2:
        return <AnimatedStepImage alt="High-Velocity Engineering, Clean Code and CI/CD" className={cn(defaultClasses.img, step3imgClass)} src={currentImages.step3img} preset="fadeInScale" />;
      case 3:
        return <AnimatedStepImage alt="Production Launch, Observability and Telemetry Dashboard" className={cn(defaultClasses.img, step4imgClass)} src={currentImages.step4img} preset="fadeInScale" />;
      default:
        return null;
    }
  };

  return (
    <div className="feature-carousel-wrapper flex flex-col gap-12 w-full max-w-4xl mx-auto p-4">
      <FeatureCard {...props} step={step} customSteps={currentSteps}>
        <AnimatePresence mode="wait">
          <motion.div key={step} {...ANIMATION_PRESETS.fadeInScale} className="w-full h-full absolute">
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </FeatureCard>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <StepsNav current={step} onChange={setStep} steps={currentSteps} />
      </motion.div>
    </div>
  );
}

export default function ProcessSteps({
  title = "Good Work Starts With the Right Questions.",
  subtitle = "Four steps from the first conversation to the finished work.",
  customSteps = steps,
  image = defaultImageSet,
  className = "",
  ...props
}) {
  return (
    <section className={cn("section", className)} id="process" style={{ position: "relative", overflow: "hidden", padding: "var(--space-3xl) 0" }}>
      <div className="container">
        <SectionHeading>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="section-title">{title}</h2>
              {subtitle && (
                <p
                  style={{
                    color: "var(--text-body)",
                    marginTop: "8px",
                    fontSize: "1.05rem",
                    maxWidth: "600px",
                    lineHeight: "1.6",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </SectionHeading>

        <FeatureCarousel image={image} customSteps={customSteps} {...props} />
      </div>
    </section>
  );
}
