import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp } from "./AnimatedPage";
import StatusBadge from "./StatusBadge";

interface InternCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  domain: string;
  status: string;
  deadline: string;
}

const InternCard = ({ id, title, company, location, stipend, duration, domain, status, deadline }: InternCardProps) => {
  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Applied for ${title} at ${company}`);
  };

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{stipend}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Domain: {domain}</p>
        <p className="mt-1 text-xs text-muted-foreground">Deadline: {deadline}</p>
        <button
          onClick={handleApply}
          className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
};

export default InternCard;
