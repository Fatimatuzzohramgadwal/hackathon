import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

interface JobFilters {
  keywords: string;
  quickApply: boolean;
  openToAll: boolean;
  locations: string[];
  workType: string[];
  domains: string[];
  workingDays: string[];
  timing: string[];
  roles: string[];
  datePosted: string;
}

interface AdvancedFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: JobFilters) => void;
  currentFilters: JobFilters;
}

const locations = ["Bangalore", "Remote", "Hyderabad", "Pune", "Delhi", "Mumbai", "Chennai"];
const workTypes = ["Work from Home", "In Office", "Hybrid", "Field"];
const domains = ["AI", "ML", "Data Science", "Web Dev", "App Dev", "Cybersecurity", "UI/UX", "Marketing", "Finance", "HR"];
const workingDaysOptions = ["5 days", "6 days"];
const timingOptions = ["Flexible", "Fixed", "Shift"];
const rolesOptions = ["Intern", "Junior", "Senior", "Lead", "Manager"];

const AdvancedFilterModal = ({ isOpen, onClose, onApply, currentFilters }: AdvancedFilterModalProps) => {
  const [filters, setFilters] = useState<JobFilters>(currentFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-border bg-card shadow-lg"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-muted-foreground hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Quick Filters */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Quick Filters</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.quickApply}
                      onChange={(e) => setFilters({ ...filters, quickApply: e.target.checked })}
                      className="rounded border-border bg-accent"
                    />
                    <span className="text-sm text-foreground">Quick Apply</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters.openToAll}
                      onChange={(e) => setFilters({ ...filters, openToAll: e.target.checked })}
                      className="rounded border-border bg-accent"
                    />
                    <span className="text-sm text-foreground">Open to All</span>
                  </label>
                </div>
              </div>

              {/* Locations */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Location</h3>
                <div className="space-y-2">
                  {locations.map((loc) => (
                    <label key={loc} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(loc)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            locations: e.target.checked
                              ? [...filters.locations, loc]
                              : filters.locations.filter((l) => l !== loc),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Type */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Work Type</h3>
                <div className="space-y-2">
                  {workTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.workType.includes(type)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            workType: e.target.checked
                              ? [...filters.workType, type]
                              : filters.workType.filter((t) => t !== type),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Domains */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Domain</h3>
                <div className="space-y-2">
                  {domains.map((domain) => (
                    <label key={domain} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.domains.includes(domain)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            domains: e.target.checked
                              ? [...filters.domains, domain]
                              : filters.domains.filter((d) => d !== domain),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{domain}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Working Days */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Working Days</h3>
                <div className="space-y-2">
                  {workingDaysOptions.map((days) => (
                    <label key={days} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.workingDays.includes(days)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            workingDays: e.target.checked
                              ? [...filters.workingDays, days]
                              : filters.workingDays.filter((d) => d !== days),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{days}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Timing</h3>
                <div className="space-y-2">
                  {timingOptions.map((time) => (
                    <label key={time} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.timing.includes(time)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            timing: e.target.checked
                              ? [...filters.timing, time]
                              : filters.timing.filter((t) => t !== time),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Roles */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Role Level</h3>
                <div className="space-y-2">
                  {rolesOptions.map((role) => (
                    <label key={role} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={filters.roles.includes(role)}
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            roles: e.target.checked
                              ? [...filters.roles, role]
                              : filters.roles.filter((r) => r !== role),
                          });
                        }}
                        className="rounded border-border bg-accent"
                      />
                      <span className="text-sm text-foreground">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div>
                <h3 className="mb-3 font-semibold text-foreground">Date Posted</h3>
                <select
                  value={filters.datePosted}
                  onChange={(e) => setFilters({ ...filters, datePosted: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
                >
                  <option value="all">All time</option>
                  <option value="last24">Last 24 hours</option>
                  <option value="last7">Last 7 days</option>
                  <option value="last30">Last 30 days</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 border-t border-border bg-card px-6 py-4 space-y-3">
              <button
                onClick={handleApply}
                className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Apply Filters
              </button>
              <button
                onClick={handleReset}
                className="w-full rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                Reset All
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilterModal;
