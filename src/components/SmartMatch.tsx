import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface SmartMatchProps {
  matchPercentage: number;
  skills: string[];
}

const SmartMatch = ({ matchPercentage, skills }: SmartMatchProps) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-success/10 text-success border-success/20";
    if (percentage >= 60) return "bg-warning/10 text-warning border-warning/20";
    return "bg-info/10 text-info border-info/20";
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return "Perfect Match";
    if (percentage >= 60) return "Good Match";
    return "Fair Match";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-lg border p-3 ${getMatchColor(matchPercentage)}`}
    >
      <div className="mb-2 flex items-center gap-2">
        <TrendingUp className="h-4 w-4" />
        <span className="text-xs font-semibold">{getMatchLabel(matchPercentage)}</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium">Match Score</span>
          <span className="text-sm font-bold">{matchPercentage}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-background/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${matchPercentage}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full bg-current"
          />
        </div>
      </div>
      {skills.length > 0 && (
        <div className="mt-2 text-xs">
          <p className="mb-1 font-semibold">Matched Skills:</p>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill) => (
              <span key={skill} className="rounded-full bg-background/50 px-2 py-0.5">
                {skill}
              </span>
            ))}
            {skills.length > 3 && <span>+{skills.length - 3}</span>}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SmartMatch;
