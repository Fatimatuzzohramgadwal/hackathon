import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, DollarSign, Clock, Building2, GraduationCap, CheckCircle2 } from "lucide-react";
import AnimatedPage from "@/components/AnimatedPage";

const JobDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <AnimatedPage>
          <Link to="/student" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Software Engineer</h1>
                <p className="mt-1 text-muted-foreground">Google India Pvt. Ltd.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />Bangalore, India</span>
              <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" />₹18–24 LPA</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />Full-time</span>
            </div>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-card-foreground">Description</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We are looking for talented software engineers to join our team in Bangalore. You'll work on large-scale distributed systems, build products used by billions, and collaborate with world-class engineers. This role offers immense growth potential and the opportunity to work on cutting-edge technology.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-card-foreground">Eligibility</h2>
                <ul className="mt-2 space-y-2">
                  {[
                    "B.Tech/M.Tech in CS, IT, or related fields",
                    "Minimum CGPA: 7.0",
                    "No active backlogs",
                    "Graduation year: 2026",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-card-foreground">Skills Required</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["DSA", "System Design", "Python", "Java", "SQL", "Problem Solving"].map((s) => (
                    <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{s}</span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-card-foreground">Process</h2>
                <div className="mt-2 flex flex-wrap gap-3">
                  {["Online Test", "Technical Interview", "HR Round", "Offer"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Apply Now
              </motion.button>
              <Link
                to="/student/applications"
                className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-accent"
              >
                Track Applications
              </Link>
            </div>
          </div>
        </AnimatedPage>
      </div>
    </div>
  );
};

export default JobDetails;
