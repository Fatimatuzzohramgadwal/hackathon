import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, FileText, Calendar, TrendingUp, Star, Clock, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import JobCard from "@/components/JobCard";
import StatusBadge from "@/components/StatusBadge";
import ChatBot from "@/components/ChatBot";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const recentJobs = [
  { id: "1", title: "Software Engineer", company: "Google", location: "Bangalore", salary: "₹18 LPA", type: "Full-time", status: "Open", deadline: "Apr 15, 2026" },
  { id: "2", title: "Data Analyst", company: "Microsoft", location: "Hyderabad", salary: "₹14 LPA", type: "Full-time", status: "Open", deadline: "Apr 20, 2026" },
  { id: "3", title: "Product Intern", company: "Flipkart", location: "Remote", salary: "₹40K/mo", type: "Internship", status: "Open", deadline: "Apr 10, 2026" },
];

const recommendedJobs = [
  { id: "4", title: "Frontend Developer", company: "Netflix", location: "Bangalore", salary: "₹20 LPA", type: "Full-time", status: "Open", deadline: "Apr 25, 2026" },
  { id: "5", title: "Backend Engineer", company: "Amazon", location: "Remote", salary: "₹19 LPA", type: "Full-time", status: "Open", deadline: "Apr 18, 2026" },
];

const applications = [
  { company: "Amazon", role: "SDE-1", status: "Shortlisted", date: "Mar 25" },
  { company: "Infosys", role: "Systems Engineer", status: "Applied", date: "Mar 22" },
  { company: "TCS", role: "Developer", status: "Interview", date: "Mar 20" },
];

const StudentDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/dashboard", {
        headers: {
          "Authorization": token
        }
      });
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 3000); // Poll every 3s for sync
    window.addEventListener('application-submitted', fetchProfile);
    return () => {
      clearInterval(interval);
      window.removeEventListener('application-submitted', fetchProfile);
    };
  }, []);

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name || "User"} 👋</h1>
            <p className="mt-1 text-sm text-muted-foreground">Here's what's happening with your placements.</p>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatsCard title="Applications" value={applications.length} change="+1 this session" icon={FileText} color="primary" />
            <StatsCard title="Interviews" value={0} icon={Calendar} color="info" />
            <StatsCard title="Shortlisted" value={0} icon={Star} color="warning" />
            <StatsCard title="Offers" value={0} icon={TrendingUp} color="success" />
            <StatsCard title="Skill Match" value="78%" icon={Zap} color="success" />
          </motion.div>

          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Openings</h2>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
                  {recentJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      {...job} 
                      isApplied={applications.some(app => app.jobTitle === job.title && app.company === job.company)}
                    />
                  ))}
                </motion.div>
              </div>

              <div>
                <h2 className="mb-4 text-lg font-semibold text-foreground">My Applications</h2>
                <div className="space-y-3">
                  {applications.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No applications yet.</p>
                  ) : (
                    applications.map((app, i) => (
                      <motion.div
                        key={app.id || i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-xl border border-border bg-card p-4 shadow-card"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-card-foreground">{app.jobTitle}</p>
                            <p className="text-sm text-muted-foreground">{app.company}</p>
                          </div>
                          <StatusBadge status={app.status} />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{app.date}</p>
                      </motion.div>
                    ))
                  )}
                </div>

                <h2 className="mb-4 mt-6 text-lg font-semibold text-foreground">Skill Insights</h2>
                <div className="space-y-2">
                  {[
                    { skill: "React", level: 85 },
                    { skill: "Python", level: 72 },
                    { skill: "SQL", level: 60 },
                    { skill: "Communication", level: 90 },
                  ].map((s, i) => (
                    <motion.div
                      key={s.skill}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="rounded-lg border border-border bg-card p-3 shadow-card"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-card-foreground">{s.skill}</span>
                        <span className="text-muted-foreground">{s.level}%</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-accent">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.level}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended for You Section */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Recommended for You ⭐</h2>
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-3 lg:grid-cols-2">
                {recommendedJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedPage>      <ChatBot compact={true} />    </DashboardLayout>
  );
};

export default StudentDashboard;
