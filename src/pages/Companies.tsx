import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, Target, Search, BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const companyData = [
  { id: 1, name: "Google", sector: "Tech", studentsPlaced: 15, avgCTC: "45 LPA", roles: ["SDE", "Data Scientist"] },
  { id: 2, name: "Microsoft", sector: "Tech", studentsPlaced: 12, avgCTC: "38 LPA", roles: ["Associate Engineer", "PM"] },
  { id: 3, name: "Amazon", sector: "E-commerce", studentsPlaced: 20, avgCTC: "32 LPA", roles: ["SDE-1", "Cloud Analyst"] },
  { id: 4, name: "Goldman Sachs", sector: "Finance", studentsPlaced: 8, avgCTC: "28 LPA", roles: ["Analyst"] },
  { id: 5, name: "Tesla", sector: "Automotive", studentsPlaced: 5, avgCTC: "40 LPA", roles: ["Mechanical Engineer", "AI Specialist"] },
];

const placementStats = [
  { name: "Google", placed: 15 },
  { name: "Microsoft", placed: 12 },
  { name: "Amazon", placed: 20 },
  { name: "Goldman Sachs", placed: 8 },
  { name: "Tesla", placed: 5 },
];

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const role = (localStorage.getItem("role") as any) || "student";

  const filteredCompanies = companyData.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role={role}>
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Partner Companies 🏢</h1>
              <p className="mt-1 text-sm text-muted-foreground">Detailed placement analytics and hiring history.</p>
            </div>
          </div>

          {/* Analytics Header */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Hiring Partners" value={120} change="+5 this month" icon={Building2} color="primary" />
            <StatsCard title="Full-time Offers" value={450} change="85% increase" icon={Target} color="success" />
            <StatsCard title="Highest CTC" value="64 LPA" change="At Google" icon={TrendingUp} color="warning" />
            <StatsCard title="Avg. Interview Prep" value="12h" change="Per student" icon={Users} color="info" />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* List & Search */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="lg:col-span-2 space-y-4">
               <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search companies or sectors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>
              
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Company</th>
                      <th className="px-4 py-3 font-semibold">Sector</th>
                      <th className="px-4 py-3 font-semibold text-center">Placed</th>
                      <th className="px-4 py-3 font-semibold">Avg. CTC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredCompanies.map((c) => (
                      <tr key={c.id} className="hover:bg-accent/50 transition-colors">
                        <td className="px-4 py-3 font-medium">{c.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{c.sector}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-1 rounded bg-primary/10 text-primary font-bold">{c.studentsPlaced}</span>
                        </td>
                        <td className="px-4 py-3 text-success font-semibold">{c.avgCTC}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Placement Chart */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate" className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold">Hiring Leaderboard</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={placementStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" width={80} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px" }} />
                    <Bar dataKey="placed" radius={[0, 4, 4, 0]}>
                      {placementStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h3 className="font-semibold mb-2">Recruiter Insight</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Companies are prioritizing **Systems Design** and **Cloud Infrastructure** skills this season. Students with AWS certifications see a 40% higher shortlist rate.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Companies;
