import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Send, SkipForward, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import { fadeInUp } from "@/components/AnimatedPage";

const roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "DevOps Engineer"];

const interviewQuestions: Record<string, string[]> = {
  "Frontend Developer": [
    "Explain the difference between let, const, and var in JavaScript.",
    "What is the Virtual DOM and how does it work in React?",
    "How would you optimize a slow React component?",
    "Explain CSS flexbox and grid layouts.",
    "What are React hooks and why are they useful?",
  ],
  "Backend Developer": [
    "Explain the differences between SQL and NoSQL databases.",
    "What is REST API and describe its principles.",
    "How do you handle authentication and authorization?",
    "Explain microservices architecture.",
    "How do you optimize database queries?",
  ],
  "Full Stack Developer": [
    "Describe the MERN stack and its components.",
    "How do you handle state management in large applications?",
    "Explain CI/CD pipelines.",
    "What are the best practices for API design?",
    "How do you secure a web application?",
  ],
  "Data Scientist": [
    "Explain the difference between supervised and unsupervised learning.",
    "What is overfitting and how do you prevent it?",
    "Describe a machine learning project you've worked on.",
    "Explain the bias-variance tradeoff.",
    "How do you handle imbalanced datasets?",
  ],
  "DevOps Engineer": [
    "Explain containerization and Docker.",
    "What is Kubernetes and why is it used?",
    "Describe your approach to CI/CD.",
    "How do you monitor and log applications?",
    "Explain infrastructure as code (IaC).",
  ],
};

const MockInterview = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleStartInterview = (role: string) => {
    setSelectedRole(role);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setTimeLeft(30);
    setIsRunning(true);
  };

  const handleSkipQuestion = () => {
    setAnswers([...answers, userAnswer]);
    if (currentQuestionIndex < interviewQuestions[selectedRole!].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setTimeLeft(30);
    } else {
      setCompleted(true);
      setIsRunning(false);
    }
  };

  const handleSubmitAnswer = () => {
    setAnswers([...answers, userAnswer]);
    if (currentQuestionIndex < interviewQuestions[selectedRole!].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setTimeLeft(30);
    } else {
      setCompleted(true);
      setIsRunning(false);
    }
  };

  const handleRestartInterview = () => {
    setSelectedRole(null);
    setCompleted(false);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setAnswers([]);
    setTimeLeft(30);
    setIsRunning(false);
  };

  // Timer effect
  React.useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSkipQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  if (completed && selectedRole) {
    return (
      <DashboardLayout role="student">
        <AnimatedPage>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <div className="rounded-xl border border-success/20 bg-success/5 p-8 text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-success" />
              <h1 className="text-2xl font-bold text-foreground">Interview Completed! 🎉</h1>
              <p className="mt-2 text-muted-foreground">
                Role: <span className="font-semibold text-foreground">{selectedRole}</span>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your Answers</h2>
              {interviewQuestions[selectedRole].map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <p className="mb-2 font-semibold text-card-foreground">Q{index + 1}: {question}</p>
                  <p className="text-sm text-muted-foreground">
                    {answers[index] || "(No answer provided)"}
                  </p>
                </motion.div>
              ))}
            </div>

            <button
              onClick={handleRestartInterview}
              className="w-full rounded-lg bg-primary py-3 text-center font-medium text-primary-foreground hover:bg-primary/90"
            >
              Try Another Role
            </button>
          </motion.div>
        </AnimatedPage>
      </DashboardLayout>
    );
  }

  if (!selectedRole) {
    return (
      <DashboardLayout role="student">
        <AnimatedPage>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mock Interview 🎤</h1>
              <p className="mt-1 text-sm text-muted-foreground">Practice with role-specific interview questions.</p>
            </div>

            <motion.div
              initial="initial"
              animate="animate"
              className="grid gap-3 sm:grid-cols-2"
            >
              {roles.map((role) => (
                <motion.button
                  key={role}
                  onClick={() => handleStartInterview(role)}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border bg-card p-4 text-left transition-all hover:border-primary hover:shadow-card-hover"
                >
                  <h3 className="font-semibold text-card-foreground">{role}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {interviewQuestions[role].length} questions
                  </p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </AnimatedPage>
      </DashboardLayout>
    );
  }

  const currentQuestion = interviewQuestions[selectedRole][currentQuestionIndex];

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                Question {currentQuestionIndex + 1} of {interviewQuestions[selectedRole].length}
              </h2>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className={`font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-accent">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / interviewQuestions[selectedRole].length) * 100}%` }}
                className="h-full rounded-full bg-primary"
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentQuestionIndex}
            className="rounded-xl border border-border bg-card p-6"
          >
            <p className="text-lg font-semibold text-card-foreground">{currentQuestion}</p>
          </motion.div>

          {/* Answer Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Answer</label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-32 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSkipQuestion}
              className="flex items-center justify-center gap-2 flex-1 rounded-lg border border-border bg-card py-3 font-medium text-foreground transition-colors hover:bg-accent"
            >
              <SkipForward className="h-4 w-4" />
              Skip
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="flex items-center justify-center gap-2 flex-1 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              {currentQuestionIndex === interviewQuestions[selectedRole].length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default MockInterview;
