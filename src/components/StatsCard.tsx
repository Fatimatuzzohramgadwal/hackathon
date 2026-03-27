import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { fadeInUp } from "./AnimatedPage";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "info";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  info: "bg-info/10 text-info",
};

const StatsCard = ({ title, value, change, icon: Icon, color = "primary" }: StatsCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2, boxShadow: "var(--shadow-card-hover)" }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
          {change && (
            <p className="mt-1 text-xs font-medium text-success">{change}</p>
          )}
        </div>
        <div className={`rounded-xl p-3 ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
