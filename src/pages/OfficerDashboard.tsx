import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Users, BarChart3, Briefcase } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import { staggerContainer } from "@/components/AnimatedPage";

interface Student {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  branch: string;
  cgpa: number;
  placed: boolean;
  company?: string;
}

const OfficerDashboard = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Rahul Sharma", email: "rahul@college.com", rollNo: "CS001", branch: "CSE", cgpa: 8.5, placed: true, company: "Google" },
    { id: "2", name: "Priya Patel", email: "priya@college.com", rollNo: "CS002", branch: "CSE", cgpa: 9.0, placed: true, company: "Microsoft" },
    { id: "3", name: "Amit Kumar", email: "amit@college.com", rollNo: "CSE003", branch: "CSE", cgpa: 7.8, placed: false },
  ]);
  const [activeTab, setActiveTab] = useState("students");
  const [user, setUser] = useState<any>(null);
  const [allApplications, setAllApplications] = useState<any[]>([]);

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
        setAllApplications(data.allApplications || []);
      }
    } catch (err) {
      console.error("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
    const interval = setInterval(fetchProfile, 3000); // ⏱️ Sync every 3s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/applications/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      fetchProfile();
    } catch (err) {
      console.error("Update failed");
    }
  };

  const stats: { title: string; value: number; icon: any; color: "primary" | "success" | "warning" | "info" }[] = [
    { title: "Total Students", value: students.length, icon: Users, color: "primary" },
    { title: "Placed", value: students.filter(s => s.placed).length, icon: Briefcase, color: "success" },
    { title: "Applications", value: allApplications.length, icon: BarChart3, color: "warning" },
  ];

  return (
    <DashboardLayout role="officer">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Officer Dashboard: {user?.name || "Officer"} 👨‍💼</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage students, companies, and placements</p>
            </div>
          </div>

          {/* Stats */}
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div className="flex gap-4 border-b border-border">
            {["students", "applications", "alumni", "companies"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Students Table */}
          {activeTab === "students" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-6 shadow-lg"
            >
              <h2 className="mb-6 text-lg font-semibold text-foreground">Student Master List</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Roll No</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Department</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">CGPA</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                        <td className="px-4 py-3 text-foreground font-medium">{student.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{student.rollNo}</td>
                        <td className="px-4 py-3 text-muted-foreground">{student.branch}</td>
                        <td className="px-4 py-3 text-muted-foreground">{student.cgpa}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                            student.placed ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                          }`}>
                            {student.placed ? "Placed" : "Pending"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-primary hover:underline font-medium">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Applications Table */}
          {activeTab === "applications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-6 shadow-lg"
            >
              <h2 className="mb-6 text-lg font-semibold text-foreground">Student Applications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Student</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Role</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Company</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Date</th>
                      <th className="px-4 py-3 text-left font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allApplications.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-muted-foreground">
                          No student applications found yet.
                        </td>
                      </tr>
                    ) : (
                      allApplications.map((app) => (
                        <tr key={app.id} className="border-b border-border hover:bg-accent/50 transition-colors">
                          <td className="px-4 py-3 text-foreground font-medium">{app.email}</td>
                          <td className="px-4 py-3 text-muted-foreground">{app.jobTitle}</td>
                          <td className="px-4 py-3 text-muted-foreground">{app.company}</td>
                          <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                          <td className="px-4 py-3">
                            <select
                              value={app.status || "Applied"}
                              onChange={(e) => updateStatus(app.id, e.target.value)}
                              className="rounded bg-accent px-2 py-1 text-xs font-semibold text-foreground border-0 outline-none focus:ring-1 focus:ring-primary"
                            >
                              <option value="Applied">Applied</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Selected">Selected</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Alumni Tab */}
          {activeTab === "alumni" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-6 shadow-lg text-center"
            >
              <p className="text-muted-foreground">Alumni management features coming soon</p>
            </motion.div>
          )}

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-border bg-card p-6 shadow-lg text-center"
            >
              <p className="text-muted-foreground">Company management features coming soon</p>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default OfficerDashboard;
