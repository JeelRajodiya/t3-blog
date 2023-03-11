import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ShouldRender from "./ShouldRender";

type Props = {
  children: React.ReactNode;
  onFinish?: () => void;
};

type ArrowProps = {
  onClick: () => void;
  prev?: boolean;
};

const arrowIconProps = {
  size: 30,
  className: "text-neutral-800 dark:text-white flex-shrink-0",
};

const Arrow: React.FC<ArrowProps> = ({ onClick, prev }) => {
  return (
    <button
      className={`absolute top-0 ${
        prev ? "-left-7" : "-right-7"
      } h-full w-5 flex justify-center items-center`}
      onClick={onClick}
    >
      <ShouldRender if={prev}>
        <MdKeyboardArrowLeft {...arrowIconProps} />
      </ShouldRender>

      <ShouldRender if={!prev}>
        <MdKeyboardArrowRight {...arrowIconProps} />
      </ShouldRender>
    </button>
  );
};

const Carousel: React.FC<Props> = ({ children, onFinish }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    mode: "free",
    slides: {
      perView: "auto",
      spacing: 15,
    },
    slideChanged: (instance) => {
      setCurrentSlide(instance.track.details.abs);
    },
  });

  const isLastSlide =
    instanceRef?.current &&
    currentSlide === instanceRef.current.track.details.maxIdx;

  const isFirstSlide = currentSlide === 0;

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider">
        {children}
      </div>

      <ShouldRender if={!isFirstSlide}>
        <Arrow
          prev
          onClick={() => instanceRef.current?.moveToIdx(currentSlide - 1)}
        />
      </ShouldRender>

      <ShouldRender if={!isLastSlide}>
        <Arrow
          onClick={() => instanceRef.current?.moveToIdx(currentSlide + 1)}
        />
      </ShouldRender>
    </div>
  );
};

export default Carousel;
