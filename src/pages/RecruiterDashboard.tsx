import { motion } from "framer-motion";
import { Users, Briefcase, UserCheck, MessageSquare, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const jobPosts = [
  { title: "SDE-1", applicants: 85, shortlisted: 12, status: "Active" },
  { title: "Data Scientist", applicants: 42, shortlisted: 8, status: "Active" },
  { title: "Product Manager", applicants: 30, shortlisted: 5, status: "Closed" },
];

const topApplicants = [
  { name: "Priya Sharma", role: "SDE-1", score: 92, status: "Shortlisted" },
  { name: "Rahul Verma", role: "Data Scientist", score: 88, status: "Interview" },
  { name: "Anita Das", role: "SDE-1", score: 85, status: "Applied" },
  { name: "Karan Singh", role: "Product Manager", score: 82, status: "Selected" },
];

const RecruiterDashboard = () => {
  return (
    <DashboardLayout role="recruiter">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Recruiter Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage your job postings and candidates.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Post New Job
            </motion.button>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Job Posts" value={6} icon={Briefcase} color="primary" />
            <StatsCard title="Total Applicants" value={245} change="+28 today" icon={Users} color="info" />
            <StatsCard title="Shortlisted" value={38} icon={UserCheck} color="warning" />
            <StatsCard title="Feedback Given" value={52} icon={MessageSquare} color="success" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Your Job Posts</h2>
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
                {jobPosts.map((j) => (
                  <motion.div
                    key={j.title}
                    variants={fadeInUp}
                    whileHover={{ y: -2 }}
                    className="rounded-xl border border-border bg-card p-5 shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-card-foreground">{j.title}</h3>
                      <StatusBadge status={j.status} />
                    </div>
                    <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                      <span>{j.applicants} applicants</span>
                      <span>{j.shortlisted} shortlisted</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <motion.button whileTap={{ scale: 0.97 }} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">
                        View Applicants
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.97 }} className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground hover:bg-accent/80">
                        Edit Post
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">Top Applicants</h2>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Candidate</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Score</th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topApplicants.map((a, i) => (
                      <motion.tr
                        key={a.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3 font-medium text-card-foreground">{a.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{a.role}</td>
                        <td className="px-4 py-3 font-semibold text-card-foreground">{a.score}</td>
                        <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
