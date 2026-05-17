import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, BookOpen, ClipboardList, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "Attendance", icon: CalendarCheck, value: "96%", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
  { label: "Subjects", icon: BookOpen, value: "8", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { label: "Assignments Due", icon: ClipboardList, value: "3", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { label: "Avg. Grade", icon: TrendingUp, value: "B+", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
];

export default function StudentDashboard() {
  const user = useQuery(api.users.getCurrentUser, {});

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold">Hello, {user?.name?.split(" ")[0] ?? "Student"} 🎓</h1>
        <p className="text-muted-foreground mt-1">Ready to learn? Here's your overview.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.07 }}>
            <Card>
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

      <Card>
        <CardHeader><CardTitle className="text-base">Today's Classes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { subject: "Mathematics", teacher: "Mr. Johnson", time: "08:00", room: "Room 201" },
            { subject: "English Literature", teacher: "Ms. Clarke", time: "10:00", room: "Room 102" },
            { subject: "Biology", teacher: "Dr. Patel", time: "13:00", room: "Lab 2" },
            { subject: "History", teacher: "Mr. Ahmed", time: "15:00", room: "Room 303" },
          ].map((c) => (
            <div key={c.subject} className="flex items-center gap-3 p-3 rounded-lg border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">{c.time}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{c.subject}</p>
                <p className="text-xs text-muted-foreground">{c.teacher} · {c.room}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}