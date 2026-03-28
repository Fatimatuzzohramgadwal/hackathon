import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { fadeInUp } from "./AnimatedPage";

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  deadline: string;
  location: string;
  type: string;
}

const EventCard = ({ id, name, date, deadline, location, type }: EventCardProps) => {
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Applied for ${name}`);
  };

  const eventTypeColors: Record<string, string> = {
    hackathon: "bg-purple/10 text-purple",
    workshop: "bg-blue/10 text-blue",
    coding: "bg-green/10 text-green",
  };

  const bgColor = eventTypeColors[type.toLowerCase()] || "bg-primary/10 text-primary";

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`inline-block rounded-lg ${bgColor} px-2 py-1 text-xs font-medium capitalize`}>
              {type}
            </div>
            <h3 className="mt-2 font-semibold text-card-foreground">{name}</h3>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Applications close: {deadline}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Register Now
        </button>
      </div>
    </motion.div>
  );
};

export default EventCard;
