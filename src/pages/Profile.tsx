import { motion } from "framer-motion";
import { Upload, Mail, Phone, MapPin, GraduationCap, Edit3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const Profile = () => {
  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Edit3 className="h-4 w-4" /> Edit Profile
            </motion.button>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
            {/* Avatar + Info */}
            <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  JD
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-card-foreground">John Doe</h2>
                  <p className="text-sm text-muted-foreground">B.Tech Computer Science • 2026</p>
                  <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground sm:justify-start">
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />john@example.com</span>
                    <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />+91 98765 43210</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />Mumbai, India</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Academic */}
            <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
                <GraduationCap className="h-5 w-5 text-primary" /> Academic Details
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "University", value: "MIT University" },
                  { label: "CGPA", value: "8.5 / 10" },
                  { label: "10th %", value: "92%" },
                  { label: "12th %", value: "88%" },
                  { label: "Backlogs", value: "None" },
                  { label: "Branch", value: "Computer Science" },
                ].map((f) => (
                  <div key={f.label}>
                    <span className="text-xs text-muted-foreground">{f.label}</span>
                    <p className="text-sm font-medium text-card-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-card-foreground">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["React", "TypeScript", "Python", "Node.js", "SQL", "Git", "Docker", "AWS", "Java", "Problem Solving"].map((s) => (
                  <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{s}</span>
                ))}
              </div>
            </motion.div>

            {/* Resume */}
            <motion.div variants={fadeInUp} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-semibold text-card-foreground">Resume</h3>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-dashed border-border bg-muted/30 p-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground">John_Doe_Resume.pdf</p>
                  <p className="text-xs text-muted-foreground">Uploaded Mar 15, 2026</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20"
                >
                  <Upload className="h-3.5 w-3.5" /> Upload New
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Profile;
