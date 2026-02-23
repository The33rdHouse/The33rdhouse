import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MeditationTimerProps {
  realmName: string;
  color?: string;
}

export default function MeditationTimer({ realmName, color = "#9333ea" }: MeditationTimerProps) {
  const [duration, setDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
    setIsComplete(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsComplete(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <Card className="border-purple-900/30 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-purple-200 text-center">Meditation Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Duration Selection */}
        {!isRunning && timeLeft === duration * 60 && (
          <div className="space-y-3">
            <p className="text-sm text-gray-400 text-center">Select duration:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {[5, 10, 15, 20, 30, 45, 60].map((mins) => (
                <Button
                  key={mins}
                  size="sm"
                  variant={duration === mins ? "default" : "outline"}
                  onClick={() => setDuration(mins)}
                  className={duration === mins ? "" : "border-purple-600 text-purple-300"}
                  style={duration === mins ? { backgroundColor: color } : {}}
                >
                  {mins}m
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Timer Display */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto relative">
            {/* Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={`${color}20`}
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke={color}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-200 font-mono">
                  {formatTime(timeLeft)}
                </div>
                {isComplete && (
                  <div className="text-sm text-purple-400 mt-2 animate-pulse">
                    Complete! 🙏
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button
              onClick={handleStart}
              size="lg"
              className="gap-2"
              style={{ backgroundColor: color }}
            >
              <Play className="w-4 h-4" />
              {timeLeft === duration * 60 ? 'Start' : 'Resume'}
            </Button>
          ) : (
            <Button
              onClick={handlePause}
              size="lg"
              variant="outline"
              className="gap-2 border-purple-600 text-purple-300"
            >
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="gap-2 border-purple-600 text-purple-300"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Meditation Guidance */}
        {isRunning && (
          <div className="text-center space-y-2 animate-fade-in">
            <p className="text-sm text-purple-300 italic">
              Meditating on {realmName}
            </p>
            <p className="text-xs text-gray-500">
              Close your eyes. Breathe deeply. Be present.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
