"use client";

import { SlideLayout, useSlideNavigation } from "@/components/slide-layout";
import { Slide1 } from "@/components/slides/slide-1";
import { Slide2 } from "@/components/slides/slide-2";
import { Slide3 } from "@/components/slides/slide-3";
import { Slide4 } from "@/components/slides/slide-4";
import { Slide5 } from "@/components/slides/slide-5";
import { Slide6 } from "@/components/slides/slide-6";
import { Slide7 } from "@/components/slides/slide-7";
import { Slide8 } from "@/components/slides/slide-8";
import { Slide9 } from "@/components/slides/slide-9";
import { Slide10 } from "@/components/slides/slide-10";
import { Slide11 } from "@/components/slides/slide-11";
import { Slide12 } from "@/components/slides/slide-12";
import { Slide13 } from "@/components/slides/slide-13";

const TOTAL_SLIDES = 13;

export default function Home() {
  const { currentSlide, goToSlide, nextSlide, prevSlide } =
    useSlideNavigation(TOTAL_SLIDES);

  const renderSlide = () => {
    switch (currentSlide) {
      case 1:
        return <Slide1 />;
      case 2:
        return <Slide2 />;
      case 3:
        return <Slide3 />;
      case 4:
        return <Slide4 />;
      case 5:
        return <Slide5 />;
      case 6:
        return <Slide6 />;
      case 7:
        return <Slide7 />;
      case 8:
        return <Slide8 />;
      case 9:
        return <Slide9 />;
      case 10:
        return <Slide10 />;
      case 11:
        return <Slide11 />;
      case 12:
        return <Slide12 />;
      case 13:
        return <Slide13 />;
      default:
        return <Slide1 />;
    }
  };

  return (
    <SlideLayout
      currentSlide={currentSlide}
      totalSlides={TOTAL_SLIDES}
      onNext={nextSlide}
      onPrev={prevSlide}
      onGoToSlide={goToSlide}
    >
      {renderSlide()}
    </SlideLayout>
  );
}
