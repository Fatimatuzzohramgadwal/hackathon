import { motion } from "framer-motion";
import { Target, TrendingUp, Clock, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const applicationTrend = [
  { month: "Jan", applications: 2 },
  { month: "Feb", applications: 4 },
  { month: "Mar", applications: 7 },
  { month: "Apr", applications: 12 },
];

const applicationStatus = [
  { name: "Applied", value: 12, color: "#3b82f6" },
  { name: "Shortlisted", value: 5, color: "#10b981" },
  { name: "Interview", value: 3, color: "#f59e0b" },
  { name: "Offer", value: 1, color: "#8b5cf6" },
];

const skillMatch = [
  { skill: "React", match: 85 },
  { skill: "Python", match: 72 },
  { skill: "SQL", match: 60 },
  { skill: "Communication", match: 90 },
  { skill: "Problem Solving", match: 78 },
];

const Analytics = () => {
  const role = (localStorage.getItem("role") as any) || "student";
  const isOfficer = role === "officer" || role === "admin" || role === "recruiter";

  return (
    <DashboardLayout role={role}>
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isOfficer ? "Placement Analytics 📊" : "My Analytics 📊"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isOfficer ? "Global placement performance and metrics." : "Track your placement journey and profile insights."}
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title={isOfficer ? "Total Students" : "Total Applications"} value={isOfficer ? 1200 : 12} change={isOfficer ? "+45 this week" : "+3 this month"} icon={Target} color="primary" />
            <StatsCard title={isOfficer ? "Total Offers" : "Interview Rounds"} value={isOfficer ? 850 : 3} change={isOfficer ? "71% success rate" : "2 upcoming"} icon={Clock} color="info" />
            <StatsCard title={isOfficer ? "Active Drives" : "Shortlisted"} value={isOfficer ? 24 : 5} change={isOfficer ? "5 new today" : "42% success rate"} icon={CheckCircle} color="success" />
            <StatsCard title={isOfficer ? "Avg. Package" : "Offers"} value={isOfficer ? "18.5 LPA" : 1} change={isOfficer ? "Top: 64 LPA" : "🎉 Congratulations!"} icon={TrendingUp} color="warning" />
          </motion.div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Application Trend */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-semibold text-card-foreground">Application Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={applicationTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                  <Area type="monotone" dataKey="applications" stroke="#3b82f6" fillOpacity={1} fill="url(#colorApplications)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Application Status */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h2 className="font-semibold text-card-foreground">Application Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={applicationStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {applicationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Skill Match */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h2 className="mb-4 font-semibold text-card-foreground">Skill Match Analysis</h2>
            <div className="space-y-4">
              {skillMatch.map((item, i) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="min-w-24 text-sm font-medium text-card-foreground">{item.skill}</span>
                  <div className="flex-1 rounded-full bg-accent p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.match}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.05 }}
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-blue-500"
                    />
                  </div>
                  <span className="min-w-12 text-right text-sm font-semibold text-primary">{item.match}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="rounded-xl border border-warning/20 bg-warning/5 p-5">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-warning" />
              <div>
                <h3 className="font-semibold text-card-foreground">Recommendations</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• Improve your SQL skills to increase job match rate</li>
                  <li>• Complete 2-3 more projects to strengthen portfolio</li>
                  <li>• Practice coding interviews - 48% success rate improvement possible</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Analytics;
