"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideLayoutProps {
  children: ReactNode;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoToSlide: (slide: number) => void;
}

export function SlideLayout({
  children,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoToSlide,
}: SlideLayoutProps) {
  const handlers = useSwipeable({
    onSwipedLeft: onNext,
    onSwipedRight: onPrev,
    trackMouse: false,
  });

  return (
    <div {...handlers} className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentSlide === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => onGoToSlide(i + 1)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === i + 1
                    ? "bg-[#22c55e] w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className={cn(
              "p-2 rounded-lg transition-colors",
              currentSlide === totalSlides
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: "default" | "prominent";
  label?: string;
}

export function CopyButton({
  text,
  className,
  variant = "default",
  label = "Copy",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  }, [text]);

  if (variant === "prominent") {
    return (
      <button
        onClick={handleCopy}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-white",
          copied ? "bg-[#16a34a]" : "bg-[#22c55e] hover:bg-[#16a34a]",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            {label}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all",
        copied
          ? "bg-[#22c55e] text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label}
        </>
      )}
    </button>
  );
}

interface CodeBlockProps {
  children: string;
  className?: string;
  copyButtonVariant?: "default" | "prominent";
  copyButtonLabel?: string;
  scrollable?: boolean;
}

export function CodeBlock({
  children,
  className,
  copyButtonVariant = "default",
  copyButtonLabel = "Copy",
  scrollable = false,
}: CodeBlockProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-3 right-3 z-10">
        <CopyButton
          text={children}
          variant={copyButtonVariant}
          label={copyButtonLabel}
        />
      </div>
      <pre
        className={cn(
          "bg-gray-50 rounded-xl p-4 pt-14 text-sm font-mono text-gray-800 overflow-x-auto",
          scrollable && "max-h-[60vh] overflow-y-auto"
        )}
      >
        <code className="whitespace-pre-wrap break-words">{children}</code>
      </pre>
    </div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "green" | "red" | "amber";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-700",
    green: "bg-[#dcfce7] text-[#15803d]",
    red: "bg-red-100 text-red-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variantStyles[variant]
      )}
    >
      {children}
    </span>
  );
}

interface CalloutCardProps {
  children: ReactNode;
  variant?: "green" | "amber";
}

export function CalloutCard({ children, variant = "green" }: CalloutCardProps) {
  const styles = {
    green: "bg-[#f0fdf4] border-l-4 border-[#22c55e]",
    amber: "bg-[#fffbeb] border-l-4 border-[#f59e0b]",
  };

  return (
    <div className={cn("p-4 rounded-r-lg", styles[variant])}>{children}</div>
  );
}

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(1);

  const goToSlide = useCallback(
    (slide: number) => {
      if (slide >= 1 && slide <= totalSlides) {
        setCurrentSlide(slide);
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide((s) => s + 1);
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide((s) => s - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return { currentSlide, goToSlide, nextSlide, prevSlide };
}
