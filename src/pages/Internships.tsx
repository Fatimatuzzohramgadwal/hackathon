import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Settings } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import InternCard from "@/components/InternCard";
import SmartMatch from "@/components/SmartMatch";
import AdvancedFilterModal from "@/components/AdvancedFilterModal";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";
import type { JobFilters } from "@/types";

const internships = [
  {
    id: "1",
    title: "ML Engineer Intern",
    company: "Google",
    location: "Bangalore",
    stipend: "₹50K/mo",
    duration: "6 months",
    domain: "AI",
    status: "Open",
    deadline: "Apr 15, 2026",
    workType: "Hybrid",
    matchScore: 92,
    matchedSkills: ["Python", "Machine Learning", "TensorFlow"],
  },
  {
    id: "2",
    title: "Web Development Intern",
    company: "Flipkart",
    location: "Hyderabad",
    stipend: "₹40K/mo",
    duration: "3 months",
    domain: "Web",
    status: "Open",
    deadline: "Apr 10, 2026",
    workType: "In Office",
    matchScore: 85,
    matchedSkills: ["React", "Node.js"],
  },
  {
    id: "3",
    title: "Data Analysis Intern",
    company: "Amazon",
    location: "Bangalore",
    stipend: "₹45K/mo",
    duration: "3 months",
    domain: "Data Science",
    status: "Open",
    deadline: "Apr 12, 2026",
    workType: "Hybrid",
    matchScore: 88,
    matchedSkills: ["Python", "SQL", "Analytics"],
  },
  {
    id: "4",
    title: "Frontend Developer Intern",
    company: "Microsoft",
    location: "Remote",
    stipend: "₹55K/mo",
    duration: "6 months",
    domain: "Web",
    status: "Open",
    deadline: "Apr 18, 2026",
    workType: "Work from Home",
    matchScore: 90,
    matchedSkills: ["React", "JavaScript", "CSS"],
  },
  {
    id: "5",
    title: "DevOps Intern",
    company: "TCS",
    location: "Pune",
    stipend: "₹35K/mo",
    duration: "3 months",
    domain: "Core",
    status: "Open",
    deadline: "Apr 22, 2026",
    workType: "In Office",
    matchScore: 78,
    matchedSkills: ["Docker", "Linux"],
  },
  {
    id: "6",
    title: "Cybersecurity Intern",
    company: "Infosys",
    location: "Remote",
    stipend: "₹42K/mo",
    duration: "6 months",
    domain: "Cybersecurity",
    status: "Open",
    deadline: "Apr 25, 2026",
    workType: "Work from Home",
    matchScore: 82,
    matchedSkills: ["Security", "Networking"],
  },
];

const domains = ["All", "AI", "Web", "Core"];
const locations = ["All", "Bangalore", "Hyderabad", "Remote", "Pune"];
const stipends = ["All", "₹30K-40K", "₹40K-50K", "₹50K+"];

const Internships = () => {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedStipend, setSelectedStipend] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    keywords: "",
    quickApply: false,
    openToAll: false,
    locations: [],
    workType: [],
    domains: [],
    workingDays: [],
    timing: [],
    roles: [],
    datePosted: "all",
  });

  const handleApplyFilters = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  const filteredInternships = internships.filter((intern) => {
    const matchesSearch =
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "All" || intern.domain === selectedDomain;
    const matchesLocation = selectedLocation === "All" || intern.location === selectedLocation;
    
    const matchesAdvancedFilters = 
      (filters.locations.length === 0 || filters.locations.includes(intern.location)) &&
      (filters.domains.length === 0 || filters.domains.includes(intern.domain)) &&
      (filters.workType.length === 0 || (intern.workType && filters.workType.includes(intern.workType)));

    return matchesSearch && matchesDomain && matchesLocation && matchesAdvancedFilters;
  });

  // Sort by match score
  const sortedInternships = [...filteredInternships].sort((a, b) => {
    return (b.matchScore || 0) - (a.matchScore || 0);
  });

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Internship Opportunities</h1>
              <p className="mt-1 text-sm text-muted-foreground">Discover exciting internship programs with AI-powered matching.</p>
            </div>
          </div>

          {/* Advanced Filter Modal */}
          <AdvancedFilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={handleApplyFilters}
            currentFilters={filters}
          />

          {/* Search Bar with Filter Button */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 font-medium text-foreground transition-colors hover:border-primary hover:bg-primary/5"
            >
              <Settings className="h-4 w-4" />
              Filters
            </button>
          </motion.div>

          {/* Quick Filters */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Domain</label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Stipend Range</label>
              <select
                value={selectedStipend}
                onChange={(e) => setSelectedStipend(e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none"
              >
                {stipends.map((stipend) => (
                  <option key={stipend} value={stipend}>
                    {stipend}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Internships List with Smart Match */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-4 lg:grid-cols-3"
          >
            {sortedInternships.map((intern) => (
              <motion.div key={intern.id} variants={fadeInUp} className="space-y-2">
                {intern.matchScore !== undefined && (
                  <SmartMatch matchPercentage={intern.matchScore} skills={intern.matchedSkills || []} />
                )}
                <InternCard {...intern} />
              </motion.div>
            ))}
          </motion.div>

          {sortedInternships.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center"
            >
              <p className="text-muted-foreground">No internships found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Internships;
