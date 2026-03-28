import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Code2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import EventCard from "@/components/EventCard";
import CountdownTimer from "@/components/CountdownTimer";
import LocationMap from "@/components/LocationMap";
import { staggerContainer, fadeInUp } from "@/components/AnimatedPage";

const events = [
  {
    id: "1",
    name: "Code Masters Hackathon",
    date: "May 5, 2026",
    deadline: "2026-04-25T23:59:59",
    location: "Bangalore, India",
    type: "Hackathon",
  },
  {
    id: "2",
    name: "Web Development Workshop",
    date: "Apr 20, 2026",
    deadline: "2026-04-15T23:59:59",
    location: "Online",
    type: "Workshop",
  },
  {
    id: "3",
    name: "AI/ML Coding Challenge",
    date: "May 10, 2026",
    deadline: "2026-04-28T23:59:59",
    location: "Hyderabad, India",
    type: "Coding",
  },
  {
    id: "4",
    name: "DevOps Summit 2026",
    date: "May 15, 2026",
    deadline: "2026-05-01T23:59:59",
    location: "Pune, India",
    type: "Workshop",
  },
  {
    id: "5",
    name: "Cloud Computing Innovation Hackathon",
    date: "June 1, 2026",
    deadline: "2026-05-15T23:59:59",
    location: "Remote",
    type: "Hackathon",
  },
  {
    id: "6",
    name: "Competitive Programming Bootcamp",
    date: "May 20, 2026",
    deadline: "2026-05-10T23:59:59",
    location: "Chennai, India",
    type: "Coding",
  },
];

const eventTypes = ["All", "Hackathon", "Workshop", "Coding"];

const TechEvents = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tech Events 🚀</h1>
              <p className="mt-1 text-sm text-muted-foreground">Participate in hackathons, workshops, and coding competitions.</p>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-card px-10 py-2.5 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none"
            />
          </motion.div>

          {/* Filter */}
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <label className="mb-2 block text-sm font-medium text-foreground">Event Type</label>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Events Grid with Maps and Countdown */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={fadeInUp} className="grid gap-4 lg:grid-cols-3 rounded-xl border border-border bg-card p-6 shadow-card">
                <div>
                  <EventCard {...event} />
                </div>
                <div>
                  <CountdownTimer targetDate={event.deadline} />
                </div>
                {event.location !== "Online" && event.location !== "Remote" && (
                  <div>
                    <LocationMap location={event.location} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center"
            >
              <p className="text-muted-foreground">No events found matching your search.</p>
            </motion.div>
          )}
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default TechEvents;
