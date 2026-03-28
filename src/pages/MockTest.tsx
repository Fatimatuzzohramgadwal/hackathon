import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AnimatedPage from "@/components/AnimatedPage";
import { fadeInUp } from "@/components/AnimatedPage";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

interface TestCategory {
  name: string;
  questions: Question[];
}

const testCategories: Record<string, TestCategory> = {
  Aptitude: {
    name: "Aptitude",
    questions: [
      {
        id: 1,
        question: "If a train travels 300 km in 5 hours, what is its speed?",
        options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
        correct: 1,
      },
      {
        id: 2,
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
      },
      {
        id: 3,
        question: "If A = 5 and B = 3, what is A² + B²?",
        options: ["24", "32", "34", "40"],
        correct: 2,
      },
      {
        id: 4,
        question: "A man walks 10 km north, then 5 km east. What is the straight distance from the start?",
        options: ["15 km", "√125 km", "√225 km", "20 km"],
        correct: 1,
      },
      {
        id: 5,
        question: "What is the missing number: 2, 5, 10, 17, ?, 37",
        options: ["24", "26", "28", "30"],
        correct: 1,
      },
    ],
  },
  Coding: {
    name: "Coding",
    questions: [
      {
        id: 1,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
        correct: 2,
      },
      {
        id: 2,
        question: "Which data structure is used for implementing DFS?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
      },
      {
        id: 3,
        question: "What is the correct syntax to declare an array in Python?",
        options: ["arr = []", "arr = ()", "arr = {}", "arr = <> "],
        correct: 0,
      },
      {
        id: 4,
        question: "Which sorting algorithm is the fastest?",
        options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
        correct: 1,
      },
      {
        id: 5,
        question: "What does SQL stand for?",
        options: ["Structured Query Language", "Strong Query Language", "System Query Language", "Structured Question Language"],
        correct: 0,
      },
    ],
  },
  "Core Subjects": {
    name: "Core Subjects",
    questions: [
      {
        id: 1,
        question: "What is the SI unit of electric current?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correct: 1,
      },
      {
        id: 2,
        question: "What is the chemical symbol for Gold?",
        options: ["Gd", "Au", "Go", "Ag"],
        correct: 1,
      },
      {
        id: 3,
        question: "What is the formula for kinetic energy?",
        options: ["mgh", "½mv²", "ma", "Fd"],
        correct: 1,
      },
      {
        id: 4,
        question: "What is the value of π (pi) approximately?",
        options: ["2.14", "3.14", "4.14", "5.14"],
        correct: 1,
      },
      {
        id: 5,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Lysosome"],
        correct: 1,
      },
    ],
  },
};

const MockTest = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleStartTest = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(testCategories[category].questions.length).fill(null));
    setTestCompleted(false);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testCategories[selectedCategory!].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    const questions = testCategories[selectedCategory!].questions;
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleRestartTest = () => {
    setSelectedCategory(null);
    setTestCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
  };

  if (testCompleted && selectedCategory) {
    const score = calculateScore();
    const questions = testCategories[selectedCategory].questions;
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correct++;
      }
    });

    return (
      <DashboardLayout role="student">
        <AnimatedPage>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <div className={`rounded-xl border-2 p-8 text-center ${score >= 70 ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5"}`}>
              <div className={`mx-auto mb-4 h-16 w-16 rounded-full flex items-center justify-center ${score >= 70 ? "bg-success/10" : "bg-warning/10"}`}>
                {score >= 70 ? (
                  <CheckCircle className="h-8 w-8 text-success" />
                ) : (
                  <XCircle className="h-8 w-8 text-warning" />
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground">{score}%</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {correct} out of {questions.length} correct
              </p>
              <p className={`mt-3 font-semibold ${score >= 70 ? "text-success" : "text-warning"}`}>
                {score >= 70 ? "Great Job! 🎉" : "Keep Practicing! 💪"}
              </p>
            </div>

            {/* Review Answers */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Answer Review</h2>
              {questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correct;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`rounded-lg border-2 p-4 ${isCorrect ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <p className="font-medium text-card-foreground">Q{index + 1}: {question.question}</p>
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Your answer:{" "}
                        <span className={isCorrect ? "text-success" : "text-destructive"}>
                          {selectedAnswers[index] !== null ? question.options[selectedAnswers[index]!] : "Not answered"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-success">
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={handleRestartTest}
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              <RotateCcw className="h-4 w-4" />
              Try Another Test
            </button>
          </motion.div>
        </AnimatedPage>
      </DashboardLayout>
    );
  }

  if (!selectedCategory) {
    return (
      <DashboardLayout role="student">
        <AnimatedPage>
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mock Tests 📝</h1>
              <p className="mt-1 text-sm text-muted-foreground">Test your knowledge with MCQ-based assessments.</p>
            </div>

            <motion.div
              initial="initial"
              animate="animate"
              className="grid gap-4 sm:grid-cols-3"
            >
              {Object.keys(testCategories).map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleStartTest(category)}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-card-hover"
                >
                  <h3 className="font-semibold text-card-foreground">{category}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {testCategories[category].questions.length} questions
                  </p>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </AnimatedPage>
      </DashboardLayout>
    );
  }

  const currentQuestion = testCategories[selectedCategory].questions[currentQuestionIndex];
  const totalQuestions = testCategories[selectedCategory].questions.length;

  return (
    <DashboardLayout role="student">
      <AnimatedPage>
        <div className="mx-auto max-w-2xl space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                {selectedCategory} - Question {currentQuestionIndex + 1}/{totalQuestions}
              </h2>
              <button
                onClick={handleRestartTest}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Exit Test
              </button>
            </div>
            <div className="h-2 rounded-full bg-accent">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
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
            <p className="text-lg font-semibold text-card-foreground">{currentQuestion.question}</p>
          </motion.div>

          {/* Options */}
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                whileHover={{ x: 4 }}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "border-primary bg-primary"
                        : "border-border"
                    }`}
                  >
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="font-medium text-foreground">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="flex-1 rounded-lg border border-border bg-card py-3 font-medium text-foreground transition-colors hover:bg-accent disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="flex-1 rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </AnimatedPage>
    </DashboardLayout>
  );
};

export default MockTest;
