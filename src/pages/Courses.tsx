import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, ExternalLink, Globe } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import CourseCard from "@/components/CourseCard";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const coursesData = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    platform: "Coursera",
    duration: "8 weeks",
    domain: "AI",
    instructor: "Andrew Ng",
    studentCount: 250000,
    rating: 4.8,
    price: "Free" as const,
  },
  {
    id: "2",
    title: "React Advanced Patterns",
    platform: "Frontend Masters",
    duration: "4 weeks",
    domain: "Web",
    instructor: "Kent C. Dodds",
    studentCount: 15000,
    rating: 4.9,
    price: "Paid" as const,
  },
  {
    id: "3",
    title: "Data Science Specialization",
    platform: "Udacity",
    duration: "6 months",
    domain: "Data Science",
    instructor: "Various",
    studentCount: 50000,
    rating: 4.7,
    price: "Paid" as const,
  },
  {
    id: "4",
    title: "AWS Cloud Practitioner",
    platform: "Linux Academy",
    duration: "6 weeks",
    domain: "Cloud",
    instructor: "Adrian Cantrill",
    studentCount: 100000,
    rating: 4.8,
    price: "Paid" as const,
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    platform: "Udemy",
    duration: "12 weeks",
    domain: "Web",
    instructor: "Colt Steele",
    studentCount: 500000,
    rating: 4.6,
    price: "Paid" as const,
  },
  {
    id: "6",
    title: "Cybersecurity Essentials",
    platform: "edX",
    duration: "8 weeks",
    domain: "Security",
    instructor: "Purdue University",
    studentCount: 30000,
    rating: 4.7,
    price: "Free" as const,
  },
  {
    id: "7",
    title: "Mobile App Development with Flutter",
    platform: "Google Developers",
    duration: "10 weeks",
    domain: "Mobile",
    instructor: "Google",
    studentCount: 80000,
    rating: 4.8,
    price: "Free" as const,
  },
  {
    id: "8",
    title: "Advanced Python Programming",
    platform: "Real Python",
    duration: "6 weeks",
    domain: "Web",
    instructor: "Real Python Team",
    studentCount: 40000,
    rating: 4.9,
    price: "Paid" as const,
  },
];

const domains = ["All", "AI", "Web", "Data Science", "Mobile", "Cloud", "Security"];

const Courses = () => {
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showW3Schools, setShowW3Schools] = useState(false);

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "All" || course.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Learning Courses 📚</h1>
              <p className="mt-1 text-sm text-muted-foreground">Enhance your skills with industry-leading courses.</p>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
            />
          </motion.div>

          {/* Domain Filter */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <label className="mb-3 block text-sm font-medium text-foreground">Filter by Domain</label>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedDomain === domain
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </motion.div>

          {/* W3Schools Integration Section */}
          <motion.div 
            variants={fadeInUp} 
            initial="initial" 
            animate="animate"
            className="rounded-lg border border-primary/30 bg-primary/5 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Learn Web Development with W3Schools</h3>
                  <p className="text-sm text-muted-foreground">Access comprehensive tutorials and documentation</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open("https://www.w3schools.com/", "_blank")}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Start Learning
                  <ExternalLink className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowW3Schools(!showW3Schools)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    showW3Schools
                      ? "bg-primary/20 text-primary"
                      : "border border-border bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  {showW3Schools ? "Hide" : "Show"} Courses
                </button>
              </div>
            </div>

            {/* W3Schools Iframe */}
            {showW3Schools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 rounded-lg overflow-hidden border border-border bg-background"
              >
                <iframe
                  src="https://www.w3schools.com/"
                  width="100%"
                  height="800px"
                  className="border-0"
                  title="W3Schools Learning Platform"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Courses Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center"
            >
              <p className="text-muted-foreground">No courses found matching your search.</p>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default Courses;
