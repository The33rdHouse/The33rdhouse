import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Link } from "wouter";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import glyphMapping from "@/data/glyphMapping.json";
import ProgressiveImage from "./ProgressiveImage";

// Get glyph image path for a realm number
const getGlyphPath = (realmNumber: number): string => {
  return glyphMapping[realmNumber.toString() as keyof typeof glyphMapping] || "/glyphs/realm-001.webp";
};

interface Realm {
  number: number;
  mythicName: string;
  gateNumber: number;
}

interface SwipeableRealmGridProps {
  realms: Realm[];
  gateColor?: string;
}

export default function SwipeableRealmGrid({ realms, gateColor = "#a78bfa" }: SwipeableRealmGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const realmsPerPage = 12; // Show 12 realms per page (one gate worth)
  const totalPages = Math.ceil(realms.length / realmsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: false,
    trackTouch: true,
  });

  // Only show swipeable interface on mobile (< 640px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const currentRealms = realms.slice(
    currentPage * realmsPerPage,
    (currentPage + 1) * realmsPerPage
  );

  if (!isMobile || !realms || realms.length === 0) {
    // Desktop view: show full grid
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {realms.map((realm) => (
          <Link key={realm.number} href={`/realms/${realm.number}`}>
            <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-purple-900/30 bg-black/40 backdrop-blur-sm">
              <CardContent className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="aspect-square rounded-lg overflow-hidden bg-black/60">
                  <ProgressiveImage
                    src={getGlyphPath(realm.number)}
                    alt={realm.mythicName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <Badge 
                    variant="outline" 
                    className="text-xs mb-1"
                    style={{ borderColor: gateColor, color: gateColor }}
                  >
                    {realm.number}
                  </Badge>
                  <h3 className="text-xs sm:text-sm font-medium text-purple-200 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {realm.mythicName}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  }

  // Mobile view: show swipeable pages
  return (
    <div className="relative">
      <div {...handlers} className="touch-pan-y">
        <div className="grid grid-cols-2 gap-3">
          {currentRealms.map((realm) => (
            <Link key={realm.number} href={`/realms/${realm.number}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 border-purple-900/30 bg-black/40 backdrop-blur-sm">
                <CardContent className="p-3 space-y-2">
                  <div className="aspect-square rounded-lg overflow-hidden bg-black/60">
                    <ProgressiveImage
                      src={getGlyphPath(realm.number)}
                      alt={realm.mythicName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className="text-xs mb-1"
                      style={{ borderColor: gateColor, color: gateColor }}
                    >
                      {realm.number}
                    </Badge>
                    <h3 className="text-xs font-medium text-purple-200 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {realm.mythicName}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <>
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
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPage
                      ? "bg-purple-600 w-8"
                      : "bg-purple-900/50"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
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
            Swipe left or right to explore realms • Page {currentPage + 1} of {totalPages}
          </p>
        </>
      )}
    </div>
  );
}
