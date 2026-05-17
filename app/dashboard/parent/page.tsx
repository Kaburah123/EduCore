import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, DollarSign, Bell, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export default function ParentDashboard() {
  const user = useQuery(api.users.getCurrentUser, {});

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0] ?? "Parent"}</h1>
        <p className="text-muted-foreground mt-1">Stay connected with your child's progress.</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Attendance", value: "96%", icon: CalendarCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
          { label: "Avg. Grade", value: "B+", icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-950/40" },
          { label: "Fees Due", value: "$420", icon: DollarSign, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
          { label: "New Notices", value: "3", icon: Bell, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/40" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.07 }}>
            <Card>
              <CardHeader className="pb-2 pt-4 px-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { text: "Mathematics assignment graded: 88/100", time: "Today", badge: "Grade", variant: "default" as const },
            { text: "Attendance marked: Present", time: "Today", badge: "Attendance", variant: "secondary" as const },
            { text: "Fee reminder: Term 2 payment due", time: "Yesterday", badge: "Fee", variant: "destructive" as const },
            { text: "Annual Sports Day announcement", time: "2 days ago", badge: "Notice", variant: "secondary" as const },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 min-w-0">
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
              </div>
              <Badge variant={a.variant} className="shrink-0 text-xs">{a.badge}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}