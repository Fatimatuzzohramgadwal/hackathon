import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import { fadeInUp } from "./AnimatedPage";

interface CourseCardProps {
  id: string;
  title: string;
  platform: string;
  duration: string;
  domain: string;
  instructor: string;
  studentCount: number;
  rating: number;
  price: "Free" | "Paid";
}

const CourseCard = ({ id, title, platform, duration, domain, instructor, studentCount, rating, price }: CourseCardProps) => {
  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Starting course: ${title}`);
  };

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      AI: "bg-purple/10 text-purple",
      Web: "bg-blue/10 text-blue",
      "Data Science": "bg-green/10 text-green",
      Mobile: "bg-orange/10 text-orange",
      Cloud: "bg-cyan/10 text-cyan",
      Security: "bg-red/10 text-red",
    };
    return colors[domain] || "bg-primary/10 text-primary";
  };

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <div className="rounded-xl border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover">
        <div className="mb-3 flex items-start justify-between">
          <div className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${getDomainColor(domain)}`}>
            {domain}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-warning">
            ⭐ {rating}
          </div>
        </div>

        <h3 className="mb-2 line-clamp-2 font-semibold text-card-foreground">{title}</h3>
        <p className="mb-3 text-xs text-muted-foreground">{platform}</p>

        <div className="mb-3 space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{studentCount.toLocaleString()} students</span>
          </div>
          <p className="text-xs">By {instructor}</p>
        </div>

        <div className="mb-4 flex items-center justify-between border-t border-border pt-3">
          <span className={`text-xs font-semibold ${price === "Free" ? "text-success" : "text-primary"}`}>
            {price}
          </span>
        </div>

        <button
          onClick={handleStart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Start Learning
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
