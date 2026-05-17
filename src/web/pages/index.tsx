import { Link } from "react-router-dom";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { BookOpenCheck, GraduationCap, Users, CalendarCheck, TrendingUp, Bell, Library, DollarSign, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { motion } from "motion/react";

const features = [
  { icon: GraduationCap, label: "Student Management", desc: "Enrollment, profiles, and class management for 1000+ students" },
  { icon: CalendarCheck, label: "Attendance Tracking", desc: "Daily attendance with real-time reports for parents and admins" },
  { icon: TrendingUp, label: "Grades & Reports", desc: "Track academic performance and generate report cards" },
  { icon: Clock, label: "Timetable", desc: "Organized weekly schedules for every class and teacher" },
  { icon: Bell, label: "Announcements", desc: "School-wide notices and direct messaging between stakeholders" },
  { icon: DollarSign, label: "Fee Management", desc: "Track fee payments, send reminders, and manage receipts" },
  { icon: Library, label: "Library", desc: "Book catalog, borrowing, and overdue tracking" },
  { icon: Users, label: "Role-Based Access", desc: "Separate dashboards for Admins, Teachers, Students, and Parents" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpenCheck className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-extrabold text-lg tracking-tight">EduCore</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors cursor-pointer">Features</a>
            <a href="#roles" className="hover:text-foreground transition-colors cursor-pointer">Who It's For</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Authenticated>
              <Button asChild size="sm">
                <Link to="/dashboard">Go to Dashboard <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </Authenticated>
            <Unauthenticated>
              <SignInButton />
            </Unauthenticated>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-32 relative">
          <motion.div
            className="text-center space-y-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-background text-sm font-medium text-primary">
              <CheckCircle2 className="w-4 h-4" /> Built for Large Schools
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance leading-tight">
              The Complete School{" "}
              <span className="text-primary">Management</span>{" "}
              Platform
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
              EduCore brings together students, teachers, parents, and administrators in one powerful, easy-to-use platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Unauthenticated>
                <SignInButton />
              </Unauthenticated>
              <Authenticated>
                <Button asChild size="lg">
                  <Link to="/dashboard">Open Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </Authenticated>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <section className="max-w-5xl mx-auto px-4 -mt-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="rounded-2xl overflow-hidden shadow-2xl border"
        >
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Students in classroom"
            className="w-full h-64 md:h-96 object-cover"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold">Everything you need</h2>
          <p className="text-muted-foreground mt-3">A complete set of tools for modern school management.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-5 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">{f.label}</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">Designed for everyone</h2>
            <p className="text-muted-foreground mt-3">Each user gets a tailored experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { role: "Admin", icon: "🏫", desc: "Full control over the school — manage students, staff, fees, and reports.", color: "border-rose-200 bg-rose-50 dark:bg-rose-950/20" },
              { role: "Teacher", icon: "👩‍🏫", desc: "Mark attendance, post assignments, enter grades, and communicate with parents.", color: "border-blue-200 bg-blue-50 dark:bg-blue-950/20" },
              { role: "Student", icon: "🎓", desc: "View timetable, check grades, submit assignments, and browse the library.", color: "border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20" },
              { role: "Parent", icon: "👪", desc: "Track your child's attendance, grades, fees, and school announcements.", color: "border-amber-200 bg-amber-50 dark:bg-amber-950/20" },
            ].map((r) => (
              <div key={r.role} className={`p-5 rounded-xl border ${r.color}`}>
                <div className="text-3xl mb-2">{r.icon}</div>
                <h3 className="font-bold text-base">{r.role}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold">Ready to transform your school?</h2>
        <p className="text-muted-foreground mt-3 mb-8">Join EduCore and streamline every aspect of school management.</p>
        <Unauthenticated><SignInButton /></Unauthenticated>
        <Authenticated>
          <Button asChild size="lg">
            <Link to="/dashboard">Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </Authenticated>
      </section>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} EduCore. All rights reserved.
      </footer>
    </div>
  );
}