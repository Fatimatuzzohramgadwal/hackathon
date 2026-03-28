import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import JobDetails from "./pages/JobDetails";
import ApplicationTracking from "./pages/ApplicationTracking";
import InterviewScheduling from "./pages/InterviewScheduling";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Alumni from "./pages/Alumni";
import Companies from "./pages/Companies";
import Internships from "./pages/Internships";
import TechEvents from "./pages/TechEvents";
import Analytics from "./pages/Analytics";
import Courses from "./pages/Courses";
import MockInterview from "./pages/MockInterview";
import MockTest from "./pages/MockTest";
import AiChat from "./pages/AiChat";

import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/jobs" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/internships" element={<ProtectedRoute allowedRoles={["student"]}><Internships /></ProtectedRoute>} />
          <Route path="/student/courses" element={<ProtectedRoute allowedRoles={["student"]}><Courses /></ProtectedRoute>} />
          <Route path="/student/test" element={<ProtectedRoute allowedRoles={["student"]}><MockTest /></ProtectedRoute>} />
          <Route path="/student/ai-chat" element={<ProtectedRoute allowedRoles={["student"]}><AiChat /></ProtectedRoute>} />
          <Route path="/student/alumni" element={<ProtectedRoute allowedRoles={["student"]}><Alumni /></ProtectedRoute>} />
          <Route path="/student/events" element={<ProtectedRoute allowedRoles={["student"]}><TechEvents /></ProtectedRoute>} />
          <Route path="/student/analytics" element={<ProtectedRoute allowedRoles={["student"]}><Analytics /></ProtectedRoute>} />
          <Route path="/student/applications" element={<ProtectedRoute allowedRoles={["student"]}><ApplicationTracking /></ProtectedRoute>} />
          <Route path="/student/interviews" element={<ProtectedRoute allowedRoles={["student"]}><InterviewScheduling /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/drives" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/companies" element={<ProtectedRoute allowedRoles={["admin"]}><Companies /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          
          {/* Officer Routes */}
          <Route path="/officer/dashboard" element={<ProtectedRoute allowedRoles={["officer"]}><OfficerDashboard /></ProtectedRoute>} />
          <Route path="/officer/alumni" element={<ProtectedRoute allowedRoles={["officer"]}><Alumni /></ProtectedRoute>} />
          <Route path="/officer/companies" element={<ProtectedRoute allowedRoles={["officer"]}><Companies /></ProtectedRoute>} />
          <Route path="/officer/analytics" element={<ProtectedRoute allowedRoles={["officer"]}><Analytics /></ProtectedRoute>} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<ProtectedRoute allowedRoles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter" element={<ProtectedRoute allowedRoles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/jobs" element={<ProtectedRoute allowedRoles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/applicants" element={<ProtectedRoute allowedRoles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/interviews" element={<ProtectedRoute allowedRoles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/recruiter/alumni" element={<ProtectedRoute allowedRoles={["recruiter"]}><Alumni /></ProtectedRoute>} />
          <Route path="/recruiter/companies" element={<ProtectedRoute allowedRoles={["recruiter"]}><Companies /></ProtectedRoute>} />
          <Route path="/recruiter/analytics" element={<ProtectedRoute allowedRoles={["recruiter"]}><Analytics /></ProtectedRoute>} />
          
          <Route path="/job/:id" element={<ProtectedRoute allowedRoles={["student", "officer", "recruiter", "admin"]}><JobDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={["student", "officer", "recruiter", "admin"]}><Profile /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRoles={["student", "officer", "recruiter", "admin"]}><Notifications /></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
