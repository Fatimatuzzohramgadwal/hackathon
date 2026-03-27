import { motion } from "framer-motion";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatusBadge from "@/components/StatusBadge";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const interviews = [
  { company: "Google", role: "Software Engineer", date: "Mar 28, 2026", time: "10:00 AM", type: "Video Call", link: "meet.google.com/abc-def", status: "Upcoming" },
  { company: "Amazon", role: "SDE-1", date: "Apr 2, 2026", time: "2:00 PM", type: "On-site", link: "Amazon Office, Hyderabad", status: "Upcoming" },
  { company: "TCS", role: "Developer", date: "Mar 20, 2026", time: "11:30 AM", type: "Video Call", link: "teams.microsoft.com/xyz", status: "Completed" },
];

const slots = [
  { time: "9:00 AM", available: true },
  { time: "10:30 AM", available: false },
  { time: "12:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:30 PM", available: false },
  { time: "5:00 PM", available: true },
];

const InterviewScheduling = () => {
  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interviews</h1>
            <p className="mt-1 text-sm text-muted-foreground">View and manage your interview schedules.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Scheduled Interviews</h2>
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
                {interviews.map((iv) => (
                  <motion.div
                    key={iv.company + iv.date}
                    variants={fadeInUp}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-card-foreground">{iv.role}</h3>
                        <p className="text-sm text-muted-foreground">{iv.company}</p>
                      </div>
                      <StatusBadge status={iv.status === "Upcoming" ? "Active" : "Closed"} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{iv.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{iv.time}</span>
                      <span className="flex items-center gap-1.5">
                        {iv.type === "Video Call" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                        {iv.type}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className="text-xs text-muted-foreground">{iv.type === "Video Call" ? "Link" : "Venue"}: </span>
                      <span className="text-xs font-medium text-primary">{iv.link}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Available Slots</h2>
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                <p className="mb-3 text-sm text-muted-foreground">Pick a preferred time slot:</p>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((s) => (
                    <motion.button
                      key={s.time}
                      whileHover={s.available ? { scale: 1.03 } : {}}
                      whileTap={s.available ? { scale: 0.97 } : {}}
                      disabled={!s.available}
                      className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all ${
                        s.available
                          ? "border-border text-card-foreground hover:border-primary hover:bg-primary/5 hover:text-primary"
                          : "cursor-not-allowed border-border/50 text-muted-foreground/50 line-through"
                      }`}
                    >
                      {s.time}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-lg bg-primary py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
                >
                  Confirm Slot
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default InterviewScheduling;
