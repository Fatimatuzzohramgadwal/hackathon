import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";

const applications = [
  {
    company: "Google", role: "Software Engineer", currentStep: 3,
    steps: [
      { label: "Applied", date: "Mar 15", done: true },
      { label: "Shortlisted", date: "Mar 20", done: true },
      { label: "Interview", date: "Mar 28", done: true },
      { label: "Selected", date: "Pending", done: false },
    ],
  },
  {
    company: "Amazon", role: "SDE-1", currentStep: 1,
    steps: [
      { label: "Applied", date: "Mar 22", done: true },
      { label: "Shortlisted", date: "Mar 25", done: true },
      { label: "Interview", date: "Pending", done: false },
      { label: "Selected", date: "—", done: false },
    ],
  },
  {
    company: "Infosys", role: "Systems Engineer", currentStep: 0,
    steps: [
      { label: "Applied", date: "Mar 24", done: true },
      { label: "Shortlisted", date: "Pending", done: false },
      { label: "Interview", date: "—", done: false },
      { label: "Selected", date: "—", done: false },
    ],
  },
];

const ApplicationTracking = () => {
  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Application Tracking</h1>
            <p className="mt-1 text-sm text-muted-foreground">Track the progress of your applications.</p>
          </div>

          <div className="space-y-4">
            {applications.map((app, ai) => (
              <motion.div
                key={app.company}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ai * 0.12, duration: 0.5 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6"
              >
                <div className="mb-5">
                  <h3 className="font-semibold text-card-foreground">{app.role}</h3>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                </div>

                <div className="flex items-start">
                  {app.steps.map((step, i) => (
                    <div key={step.label} className="flex flex-1 flex-col items-center">
                      <div className="flex w-full items-center">
                        {i > 0 && (
                          <div className={`h-0.5 flex-1 ${step.done ? "bg-primary" : "bg-border"}`} />
                        )}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 + i * 0.15 }}
                        >
                          {step.done ? (
                            <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                          ) : i === app.currentStep + 1 ? (
                            <Clock className="h-6 w-6 shrink-0 text-warning" />
                          ) : (
                            <Circle className="h-6 w-6 shrink-0 text-border" />
                          )}
                        </motion.div>
                        {i < app.steps.length - 1 && (
                          <div className={`h-0.5 flex-1 ${app.steps[i + 1]?.done ? "bg-primary" : "bg-border"}`} />
                        )}
                      </div>
                      <span className="mt-2 text-center text-xs font-medium text-card-foreground">{step.label}</span>
                      <span className="text-center text-[10px] text-muted-foreground">{step.date}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default ApplicationTracking;
