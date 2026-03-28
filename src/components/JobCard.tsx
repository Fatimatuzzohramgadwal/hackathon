import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock, Building2, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fadeInUp } from "./AnimatedPage";
import StatusBadge from "./StatusBadge";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  deadline: string;
  isApplied?: boolean;
}

const JobCard = ({ id, title, company, location, salary, type, status, deadline, isApplied = false }: JobCardProps) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [applied, setApplied] = useState(isApplied);

  useEffect(() => {
    if (isApplied) setApplied(true);
  }, [isApplied]);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop parent Link click
    setBookmarked(!bookmarked);
  };

  const handleApply = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop parent Link click
    
    if (applied) return;

    console.log("📩 Applying for:", title, "at", company);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to apply");
      return;
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          jobTitle: title,
          company: company
        }),
      });

      if (response.ok) {
        setApplied(true);
        alert("Application Submitted! ✅");
        console.log("✅ Application successful!");
        // Refresh dashboard list
        window.dispatchEvent(new Event('application-submitted'));
      } else {
        const errorData = await response.json().catch(() => ({}));
        const msg = errorData.message || "Unknown error";
        console.error("❌ Server rejected application:", msg);
        alert(`Server Error: ${msg}`);
      }
    } catch (err) {
      console.error("❌ Apply failed", err);
      alert("Network Error: Could not connect to backend.");
    }
  };

  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/job/${id}`}
        className="block rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover"
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`rounded-lg p-2 transition-colors ${
                bookmarked ? "bg-warning/10 text-warning" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              <Star className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <div className="ml-2">
              <StatusBadge status={status} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{location}</span>
          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />{salary}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{type}</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Deadline: {deadline}</p>
        
        {/* Apply Button */}
        <motion.button
          onClick={handleApply}
          className={`mt-4 w-full rounded-lg py-2 text-sm font-medium transition-all ${
            applied
              ? "bg-success/10 text-success"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {applied ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="h-4 w-4" />
              Applied!
            </span>
          ) : (
            "Apply Now"
          )}
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default JobCard;
