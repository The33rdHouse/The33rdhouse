import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import GateCard from "./GateCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Gate {
  number: number;
  name: string;
  theme: string;
  description: string;
  keyword: string;
  level: string;
  realmCluster: string;
  shadow: string;
  gift: string;
  somaticShift: string;
  praxis: string;
}

interface SwipeableGateCardProps {
  gates: Gate[];
}

export default function SwipeableGateCard({ gates }: SwipeableGateCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gates.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gates.length) % gates.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: false,
    trackTouch: true,
  });

  // Only show swipeable interface on mobile (< 640px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  if (!isMobile || !gates || gates.length === 0) {
    // Desktop view: show grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gates.map((gate) => (
          <GateCard key={gate.number} gate={gate} />
        ))}
      </div>
    );
  }

  // Mobile view: show swipeable carousel
  return (
    <div className="relative">
      <div {...handlers} className="touch-pan-y">
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <GateCard gate={gates[currentIndex]} />
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-2">
          {gates.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-purple-600 w-8"
                  : "bg-purple-900/50"
              }`}
              aria-label={`Go to gate ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-gray-500 text-sm mt-4">
        Swipe left or right to explore gates
      </p>
    </div>
  );
}
