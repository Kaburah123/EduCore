import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, BookOpen, ClipboardList, Users } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { label: "My Classes", icon: BookOpen, value: "4", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
  { label: "Students", icon: Users, value: "142", color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
  { label: "Pending Assignments", icon: ClipboardList, value: "8", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
  { label: "Today's Classes", icon: CalendarCheck, value: "3", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
];

export default function TeacherDashboard() {
  const user = useQuery(api.users.getCurrentUser, {});

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0] ?? "Teacher"}</h1>
        <p className="text-muted-foreground mt-1">Here's your teaching overview for today.</p>
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
        <CardHeader>
          <CardTitle className="text-base">Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { subject: "Mathematics", class: "Grade 10A", time: "08:00 - 09:00", room: "Room 201" },
            { subject: "Physics", class: "Grade 11B", time: "10:00 - 11:00", room: "Lab 1" },
            { subject: "Mathematics", class: "Grade 9C", time: "13:00 - 14:00", room: "Room 105" },
          ].map((s) => (
            <div key={s.subject + s.class} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
              <div className="w-14 text-center">
                <p className="text-xs font-semibold text-primary">{s.time.split(" - ")[0]}</p>
                <p className="text-xs text-muted-foreground">{s.time.split(" - ")[1]}</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-sm font-medium">{s.subject}</p>
                <p className="text-xs text-muted-foreground">{s.class} · {s.room}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}