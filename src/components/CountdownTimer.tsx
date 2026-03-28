import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: string;
  compact?: boolean;
}

const CountdownTimer = ({ targetDate, compact = false }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          expired: false,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs font-semibold text-warning">
        <Clock className="h-3.5 w-3.5" />
        {timeLeft.expired ? (
          <span>Closed</span>
        ) : (
          <span>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-warning" />
        <p className="font-semibold text-foreground">Application Deadline</p>
      </div>
      {timeLeft.expired ? (
        <p className="text-sm font-semibold text-destructive">Applications Closed</p>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{timeLeft.days}</p>
            <p className="text-xs text-muted-foreground">Days</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{timeLeft.hours}</p>
            <p className="text-xs text-muted-foreground">Hours</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{timeLeft.minutes}</p>
            <p className="text-xs text-muted-foreground">Minutes</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{timeLeft.seconds}</p>
            <p className="text-xs text-muted-foreground">Seconds</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
