import { motion } from "framer-motion";
import { Users, Briefcase, Building2, TrendingUp, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import StatusBadge from "@/components/StatusBadge";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const drives = [
  { name: "Google Campus Hiring 2026", status: "Active", students: 248, date: "Mar 15 – Apr 30" },
  { name: "Amazon SDE Drive", status: "Active", students: 182, date: "Apr 1 – Apr 25" },
  { name: "TCS NQT 2026", status: "Closed", students: 520, date: "Feb 10 – Mar 10" },
  { name: "Infosys Instep", status: "Active", students: 95, date: "Apr 5 – May 15" },
];

const companies = [
  { name: "Google", roles: 3, hires: 12 },
  { name: "Microsoft", roles: 2, hires: 8 },
  { name: "Amazon", roles: 4, hires: 15 },
  { name: "Flipkart", roles: 2, hires: 6 },
];

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
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
        }
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout role="admin">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin: {user?.name || "Administrator"} Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">Overview of all placement activities.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-4 w-4" /> Create Drive
            </motion.button>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Students" value="1,240" change="+45 new" icon={Users} color="primary" />
            <StatsCard title="Active Drives" value={8} icon={Briefcase} color="info" />
            <StatsCard title="Companies" value={32} change="+5 this month" icon={Building2} color="warning" />
            <StatsCard title="Placed Students" value={420} change="34% rate" icon={TrendingUp} color="success" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Placement Drives</h2>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Drive</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Students</th>
                        <th className="px-4 py-3 text-left font-medium text-muted-foreground">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {drives.map((d, i) => (
                        <motion.tr
                          key={d.name}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 }}
                          className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                        >
                          <td className="px-4 py-3 font-medium text-card-foreground">{d.name}</td>
                          <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                          <td className="px-4 py-3 text-muted-foreground">{d.students}</td>
                          <td className="px-4 py-3 text-muted-foreground">{d.date}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Top Companies</h2>
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-3">
                {companies.map((c) => (
                  <motion.div
                    key={c.name}
                    variants={fadeInUp}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.roles} open roles</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-success">{c.hires} hires</span>
                  </motion.div>
                ))}
              </motion.div>

              <h2 className="mb-4 mt-6 text-lg font-semibold text-foreground">Quick Stats</h2>
              <div className="rounded-xl border border-border bg-card p-5 shadow-card">
                {[
                  { label: "Avg Package", value: "₹12.5 LPA" },
                  { label: "Highest Package", value: "₹42 LPA" },
                  { label: "Companies Visited", value: "32" },
                  { label: "Ongoing Interviews", value: "18" },
                ].map((s, i) => (
                  <div key={s.label} className={`flex items-center justify-between py-2.5 ${i > 0 ? "border-t border-border" : ""}`}>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className="text-sm font-semibold text-card-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default AdminDashboard;
