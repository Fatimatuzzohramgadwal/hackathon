import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, BarChart3, Shield, Zap, Globe, BookOpen, Brain, MessageSquare } from "lucide-react";

// Typing animation component
const TypingEffect = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return <span>{displayedText}</span>;
};

// Floating stats component
const FloatingStats = () => {
  const stats = [
    { label: "Students Placed", value: "500+" },
    { label: "Companies", value: "100+" },
    { label: "Opportunities", value: "1000+" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
          className="rounded-lg border border-primary/30 bg-primary/5 px-6 py-4 text-center backdrop-blur-sm"
        >
          <motion.div className="text-2xl font-bold text-primary">{stat.value}</motion.div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ y: -5 }}
    className="rounded-xl border border-border bg-card p-6 shadow-lg transition-all hover:border-primary/50 hover:shadow-xl"
  >
    <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-3">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground">{desc}</p>
  </motion.div>
);

const features = [
  { icon: Briefcase, title: "Smart Placements", desc: "Create and manage campus placement drives intelligently." },
  { icon: Users, title: "Multi-Role Platform", desc: "Dedicated dashboards for students, officers, and recruiters." },
  { icon: BarChart3, title: "Real-time Analytics", desc: "Track placement stats and company participation live." },
  { icon: Shield, title: "Verified Profiles", desc: "Ensure data accuracy with verified credentials." },
  { icon: Zap, title: "Instant Notifications", desc: "Real-time alerts for openings and status changes." },
  { icon: Globe, title: "Company Network", desc: "Build relationships with recruiting companies worldwide." },
  { icon: BookOpen, title: "Learning Courses", desc: "Access W3Schools and curated learning resources." },
  { icon: Brain, title: "AI Assistant", desc: "Get instant career and interview guidance 24/7." },
];

const Landing = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold text-foreground">
            Place<span className="text-primary">Hub</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-32 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Left side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              {/* Main heading with typing effect */}
              <motion.h1 className="mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">
                  <TypingEffect text="Smart Placement Platform" speed={40} />
                </span>
                <span className="mt-2 block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  for Future Engineers
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8 text-lg text-muted-foreground"
              >
                Connect students, companies, and recruiters on a unified platform. Streamline placements with AI-powered matching, real-time analytics, and role-based management tools.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:bg-accent"
                >
                  Login Now
                </Link>
              </motion.div>

              {/* Role Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <p className="w-full text-sm text-muted-foreground">Quick Login:</p>
                <Link to="/login" className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20">👨‍🎓 Student</Link>
                <Link to="/login" className="rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-600 transition-all hover:bg-purple-500/20">👨‍💼 Officer</Link>
                <Link to="/login" className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-500/20">🏢 Recruiter</Link>
              </motion.div>
            </motion.div>

            {/* Right side - Floating Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <div className="w-full space-y-8">
                <FloatingStats />
                
                {/* Decorative card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="rounded-lg border border-primary/30 bg-primary/5 p-6 backdrop-blur-sm"
                >
                  <div className="text-sm font-semibold text-primary mb-2">✨ New Feature</div>
                  <p className="text-sm text-foreground">AI-powered career guidance available 24/7 for all students!</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for successful placements
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <FeatureCard
                key={i}
                {...feature}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-purple-600/10 p-8 text-center backdrop-blur-sm sm:p-12"
          >
            <h3 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
              Ready to Transform Your Placement Process?
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              Join hundreds of educational institutions using PlaceHub for streamlined campus placements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:opacity-90"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-all hover:bg-accent"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>&copy; 2026 PlaceHub. All rights reserved. | Transforming Campus Placements</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
