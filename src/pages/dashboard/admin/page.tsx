import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api.js";
import { useQuery } from "convex/react";
import {
    Bell,
    BookOpen,
    CalendarCheck,
    DollarSign,
    GraduationCap,
    Library,
    TrendingUp,
    Users,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Total Students", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40", value: "1,248" },
  { label: "Teachers", icon: Users, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40", value: "64" },
  { label: "Classes", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40", value: "38" },
  { label: "Attendance Today", icon: CalendarCheck, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40", value: "94.2%" },
  { label: "Fees Collected", icon: DollarSign, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-950/40", value: "$84,200" },
  { label: "Announcements", icon: Bell, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40", value: "12 active" },
  { label: "Assignments", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/40", value: "143 open" },
  { label: "Books Borrowed", icon: Library, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40", value: "287" },
];

export default function AdminDashboard() {
  const user = useQuery(api.users.getCurrentUser, {});

    return (
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name?.split(" ")[0] ?? "Admin"} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening at your school today.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-default">
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Annual Sports Day", time: "2 hours ago", tag: "School-wide" },
                { title: "Parent-Teacher Meeting", time: "Yesterday", tag: "Grade 10" },
                { title: "Mid-term Exam Schedule", time: "2 days ago", tag: "All Grades" },
              ].map((a) => (
                <div key={a.title} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Bell className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.time} · {a.tag}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Board Meeting", date: "May 20", type: "Admin" },
                { title: "Science Fair", date: "May 24", type: "School" },
                { title: "Term 2 Exams Begin", date: "Jun 2", type: "Academic" },
                { title: "Graduation Ceremony", date: "Jun 15", type: "School" },
              ].map((e) => (
                <div key={e.title} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{e.date.split(" ")[1]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.date} · {e.type}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }