import { motion } from "framer-motion";
import { Bell, Briefcase, Calendar, CheckCircle2, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";

const iconMap: Record<string, React.ElementType> = {
  job: Briefcase,
  interview: Calendar,
  status: CheckCircle2,
  info: Info,
};

const colorMap: Record<string, string> = {
  job: "bg-primary/10 text-primary",
  interview: "bg-warning/10 text-warning",
  status: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
};

const notifications = [
  { type: "job", title: "New Opening: SDE-1 at Google", desc: "A new job matching your profile has been posted.", time: "2 hours ago", read: false },
  { type: "status", title: "Application Shortlisted", desc: "Your application for Amazon SDE-1 has been shortlisted!", time: "5 hours ago", read: false },
  { type: "interview", title: "Interview Scheduled", desc: "Your interview with TCS is scheduled for Mar 28 at 10 AM.", time: "1 day ago", read: true },
  { type: "info", title: "Profile Reminder", desc: "Complete your profile to improve visibility to recruiters.", time: "2 days ago", read: true },
  { type: "job", title: "Drive: Infosys Instep", desc: "New placement drive announced. Check eligibility.", time: "3 days ago", read: true },
  { type: "status", title: "Offer Received!", desc: "Congratulations! You've received an offer from Microsoft.", time: "4 days ago", read: true },
];

const Notifications = () => {
  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
              <p className="mt-1 text-sm text-muted-foreground">{notifications.filter(n => !n.read).length} unread</p>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">Mark all read</button>
          </div>

          <div className="space-y-2">
            {notifications.map((n, i) => {
              const Icon = iconMap[n.type] || Bell;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`flex gap-3 rounded-xl border p-4 transition-colors ${
                    n.read ? "border-border bg-card" : "border-primary/20 bg-primary/[0.02]"
                  }`}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${n.read ? "text-card-foreground" : "text-foreground"}`}>{n.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.desc}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                  </div>
                  {!n.read && <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Notifications;
