import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Download, Search, Filter, CheckCircle2, XCircle, Briefcase, Building2, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import StatsCard from "@/components/StatsCard";
import { staggerContainer } from "@/components/AnimatedPage";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RecruiterDashboard = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("candidates");

  const [myJobs, setMyJobs] = useState([
    { id: "1", title: "Software Engineer", applicants: 45, status: "Active", posted: "Mar 15, 2026" },
    { id: "2", title: "Data Analyst", applicants: 28, status: "Active", posted: "Mar 20, 2026" },
    { id: "3", title: "Product Intern", applicants: 102, status: "Closed", posted: "Feb 10, 2026" },
  ]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("/api/dashboard", {
        headers: { "Authorization": token }
      });
      const data = await response.json();
      if (data.allApplications) {
        setCandidates(data.allApplications);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.location.pathname.includes("/jobs")) {
      setActiveTab("jobs");
    } else {
      setActiveTab("candidates");
    }
  }, [window.location.pathname]);

  const filteredCandidates = candidates.filter((c) => {
    const nameStr = c.name || c.email || "";
    const matchesSearch = nameStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || (c.status || "Applied").toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const stats: { title: string; value: number | string; icon: any; color: "primary" | "success" | "warning" | "info" }[] = [
    { title: "Active Posts", value: myJobs.filter(j => j.status === "Active").length, icon: Briefcase, color: "info" },
    { title: "Total Applicants", value: candidates.length, icon: Users, color: "primary" },
    { title: "Hired", value: candidates.filter(c => c.status === "selected").length, icon: CheckCircle2, color: "success" },
  ];

  const updateCandidateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch("/api/applications/status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchData();
    } catch (err) {
      console.error("Update failed");
    }
  };

  const getStatusColor = (status: string) => {
    const s = (status || "Applied").toLowerCase();
    switch (s) {
      case "selected":
        return "bg-green-500/20 text-green-700";
      case "shortlisted":
        return "bg-blue-500/20 text-blue-700";
      case "rejected":
        return "bg-red-500/20 text-red-700";
      default:
        return "bg-yellow-500/20 text-yellow-700";
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Recruiter Portal: {user?.name || "Talent Partner"} 🏢</h1>
                <p className="mt-1 text-sm text-muted-foreground">Manage your recruitment pipeline and job postings.</p>
              </div>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Post New Job
            </button>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab("candidates")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "candidates"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Candidates
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                activeTab === "jobs"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Job Posts
            </button>
          </div>

          {activeTab === "candidates" ? (
            <div className="space-y-6">
              {/* Controls */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-4 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    placeholder="Search by student email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </motion.div>

              {/* Candidates Table */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-border bg-card p-6 shadow-lg"
              >
                <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Applications ({filteredCandidates.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="px-4 py-3 font-semibold">Student Email</th>
                        <th className="px-4 py-3 font-semibold">Role</th>
                        <th className="px-4 py-3 font-semibold">Company</th>
                        <th className="px-4 py-3 font-semibold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-accent/50 transition-colors">
                          <td className="px-4 py-3 font-medium">{candidate.email}</td>
                          <td className="px-4 py-3 text-muted-foreground">{candidate.jobTitle}</td>
                          <td className="px-4 py-3 text-muted-foreground">{candidate.company}</td>
                          <td className="px-4 py-3 text-center">
                            <select
                              value={candidate.status || "Applied"}
                              onChange={(e) => updateCandidateStatus(candidate.id, e.target.value)}
                              className={`rounded px-2 py-1 text-xs font-semibold ${getStatusColor(candidate.status)} border-0 outline-none`}
                            >
                              <option value="Applied">Applied</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Selected">Selected</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <h2 className="mb-6 text-lg font-semibold text-foreground">My Job Postings</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {myJobs.map((job) => (
                  <div key={job.id} className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-card">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                        job.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{job.title}</h3>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground font-medium text-xs">Applicants</span>
                        <span className="text-lg font-bold text-primary">{job.applicants}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-muted-foreground font-medium text-xs">Posted On</span>
                        <span className="text-xs">{job.posted}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                       <button className="flex-1 rounded-lg bg-accent py-2 text-xs font-medium hover:bg-accent/80 transition-colors">Applicants</button>
                       <button className="rounded-lg bg-accent px-3 py-2 text-xs font-medium hover:bg-accent/80 transition-colors text-primary">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;
