import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./pages/layout/AppLayout.tsx";
import DashboardIndex from "./pages/dashboard/index.tsx";
import AdminDashboard from "./pages/dashboard/admin/page.tsx";
import TeacherDashboard from "./pages/dashboard/teacher/page.tsx";
import StudentDashboard from "./pages/dashboard/student/page.tsx";
import ParentDashboard from "./pages/dashboard/parent/page.tsx";
import StudentsPage from "./pages/students/page.tsx";
import AttendancePage from "./pages/attendance/page.tsx";
import GradesPage from "./pages/grades/page.tsx";
import TimetablePage from "./pages/timetable/page.tsx";
import AssignmentsPage from "./pages/assignments/page.tsx";
import AnnouncementsPage from "./pages/announcements/page.tsx";
import FeesPage from "./pages/fees/page.tsx";
import LibraryPage from "./pages/library/page.tsx";
import UsersPage from "./pages/users/page.tsx";
import SettingsPage from "./pages/settings/page.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* App routes - inside layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/parent" element={<ParentDashboard />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}