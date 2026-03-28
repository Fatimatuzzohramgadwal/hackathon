import { motion } from "framer-motion";
import { MessageSquare, Linkedin, Mail } from "lucide-react";
import { fadeInUp } from "./AnimatedPage";

interface AlumniCardProps {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  linkedIn?: string;
}

const AlumniCard = ({ id, name, role, company, image, linkedIn }: AlumniCardProps) => {
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
      <div className="rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-card-hover">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {name.charAt(0)}{name.split(" ")[1]?.charAt(0) || ""}
          </div>
          <h3 className="mt-3 font-semibold text-card-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="text-xs text-muted-foreground">{company}</p>
          
          <div className="mt-4 flex gap-2">
            {linkedIn && (
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            )}
            <button className="flex items-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent/80">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </button>
            <button className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80">
              <MessageSquare className="h-3.5 w-3.5" />
              Ask
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlumniCard;
