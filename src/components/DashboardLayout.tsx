import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Users, Calendar, Bell, User, LogOut,
  Menu, X, ChevronLeft, Building2, FileText, BarChart3, Settings
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const studentNav: NavItem[] = [
  { label: "Dashboard", path: "/student", icon: LayoutDashboard },
  { label: "Jobs", path: "/student/jobs", icon: Briefcase },
  { label: "Applications", path: "/student/applications", icon: FileText },
  { label: "Interviews", path: "/student/interviews", icon: Calendar },
  { label: "Profile", path: "/profile", icon: User },
  { label: "Notifications", path: "/notifications", icon: Bell },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Drives", path: "/admin/drives", icon: Briefcase },
  { label: "Students", path: "/admin/students", icon: Users },
  { label: "Companies", path: "/admin/companies", icon: Building2 },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Notifications", path: "/notifications", icon: Bell },
];

const recruiterNav: NavItem[] = [
  { label: "Dashboard", path: "/recruiter", icon: LayoutDashboard },
  { label: "Job Posts", path: "/recruiter/jobs", icon: Briefcase },
  { label: "Applicants", path: "/recruiter/applicants", icon: Users },
  { label: "Interviews", path: "/recruiter/interviews", icon: Calendar },
  { label: "Notifications", path: "/notifications", icon: Bell },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "student" | "admin" | "recruiter";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = role === "admin" ? adminNav : role === "recruiter" ? recruiterNav : studentNav;
  const roleLabel = role === "admin" ? "Placement Officer" : role === "recruiter" ? "Recruiter" : "Student";

  const NavContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link to="/" className="text-lg font-bold text-foreground">
            Place<span className="text-primary">Hub</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:block"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1.5 text-muted-foreground lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className={`flex items-center gap-3 rounded-lg px-3 py-2 ${collapsed ? "justify-center" : ""}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {roleLabel[0]}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">John Doe</p>
              <p className="truncate text-xs text-muted-foreground">{roleLabel}</p>
            </div>
          )}
        </div>
        <Link
          to="/"
          className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden shrink-0 border-r border-border bg-card lg:block"
      >
        <NavContent />
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-border bg-card lg:hidden"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <Link to="/notifications" className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Link>
          <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            J
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
