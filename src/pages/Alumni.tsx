import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Users, MapPin, Briefcase } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import AlumniCard from "@/components/AlumniCard";
import StatsCard from "@/components/StatsCard";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const alumniData = [
  {
    id: "1",
    name: "Aditya Kumar",
    role: "Senior Software Engineer",
    company: "Google",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "2",
    name: "Priya Singh",
    role: "Product Manager",
    company: "Microsoft",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "3",
    name: "Rahul Patel",
    role: "Data Scientist",
    company: "Amazon",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "4",
    name: "Neha Sharma",
    role: "DevOps Engineer",
    company: "Meta",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "5",
    name: "Arjun Nair",
    role: "Full Stack Developer",
    company: "Netflix",
    linkedIn: "https://linkedin.com",
  },
  {
    id: "6",
    name: "Divya Gupta",
    role: "AI/ML Engineer",
    company: "Tesla",
    linkedIn: "https://linkedin.com",
  },
];

const branches = ["All", "CSE", "ECE", "Mechanical", "Civil"];
const years = ["All", "2024", "2023", "2022", "2021"];
const companies = ["All", "Google", "Microsoft", "Amazon", "Meta", "Netflix", "Tesla"];

const Alumni = () => {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const role = (localStorage.getItem("role") as any) || "student";

  const filteredAlumni = alumniData.filter((alumni) => {
    const matchesSearch =
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany === "All" || alumni.company === selectedCompany;
    return matchesSearch && matchesCompany;
  });

  return (
    <DashboardLayout role={role}>
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Alumni Network 🎓</h1>
              <p className="mt-1 text-sm text-muted-foreground">Placement success stories and insights.</p>
            </div>
          </div>

          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Alumni" value={1850} icon={Users} color="primary" />
            <StatsCard title="Avg. Package" value="18.5 LPA" icon={TrendingUp} color="success" />
            <StatsCard title="Top Recruiters" value="Goldman Sachs" icon={Briefcase} color="warning" />
            <StatsCard title="Global Reach" value="22 Countries" icon={MapPin} color="info" />
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
            />
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Graduation Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Alumni Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} {...alumni} />
            ))}
          </motion.div>

          {filteredAlumni.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center"
            >
              <p className="text-muted-foreground">No alumni found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Alumni;
