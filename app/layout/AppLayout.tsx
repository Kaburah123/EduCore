import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Authenticated, Unauthenticated, AuthLoading, useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  Clock,
  ClipboardList,
  Bell,
  DollarSign,
  Library,
  Users,
  Settings,
  LogOut,
  BookOpenCheck,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import type { Doc } from "@/convex/_generated/dataModel.d.ts";

type UserRole = "admin" | "teacher" | "student" | "parent";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to: string;
  roles: UserRole[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Students", icon: GraduationCap, to: "/students", roles: ["admin", "teacher"] },
  { label: "Attendance", icon: CalendarCheck, to: "/attendance", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Grades", icon: TrendingUp, to: "/grades", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Timetable", icon: Clock, to: "/timetable", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Assignments", icon: ClipboardList, to: "/assignments", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Announcements", icon: Bell, to: "/announcements", roles: ["admin", "teacher", "student", "parent"] },
  { label: "Fees", icon: DollarSign, to: "/fees", roles: ["admin", "parent"] },
  { label: "Library", icon: Library, to: "/library", roles: ["admin", "teacher", "student"] },
  { label: "Users", icon: Users, to: "/users", roles: ["admin"] },
];

function getInitials(name?: string | null) {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getRoleBadgeClass(role?: string) {
  switch (role) {
    case "admin": return "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300";
    case "teacher": return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
    case "student": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";
    case "parent": return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";
    default: return "bg-muted text-muted-foreground";
  }
}

type SidebarProps = {
  user: Doc<"users"> | null | undefined;
  onClose?: () => void;
};

function Sidebar({ user, onClose }: SidebarProps) {
  const { signout } = useAuth();
  const role = (user?.role ?? "admin") as UserRole;
  const filtered = navItems.filter((i) => i.roles.includes(role));

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
          <BookOpenCheck className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-bold text-lg tracking-tight">EduCore</span>
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1 hover:bg-sidebar-accent rounded-md cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className="px-4 py-3 shrink-0">
        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize", getRoleBadgeClass(role))}>
          {role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {filtered.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User area */}
      <div className="px-3 py-4 border-t border-sidebar-border shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sidebar-accent/60 cursor-pointer transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-sidebar-primary text-sidebar-primary-foreground">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate">{user?.name ?? "Loading..."}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user?.email ?? ""}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-sidebar-foreground/50 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <NavLink to="/settings" className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signout()} className="text-destructive cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function BottomNav({ user }: { user: Doc<"users"> | null | undefined }) {
  const role = (user?.role ?? "admin") as UserRole;
  const filtered = navItems.filter((i) => i.roles.includes(role)).slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-sidebar border-t border-sidebar-border flex justify-around px-1 py-2 z-40 md:hidden">
      {filtered.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors cursor-pointer",
              isActive ? "text-sidebar-primary" : "text-sidebar-foreground/50"
            )
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function AppLayoutInner() {
  const user = useQuery(api.users.getCurrentUser, {});
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-border">
        <Sidebar user={user} />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col">
            <Sidebar user={user} onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b bg-background shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded-md hover:bg-muted cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-primary" />
            <span className="font-bold text-base">EduCore</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNav user={user} />
    </div>
  );
}

export default function AppLayout() {
  return (
    <>
      <AuthLoading>
        <div className="flex h-screen items-center justify-center">
          <div className="space-y-3 w-64">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </AuthLoading>
      <Unauthenticated>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpenCheck className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-xl font-bold">Sign in to EduCore</h2>
            <p className="text-muted-foreground text-sm">Please sign in to access the school management system.</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>
      <Authenticated>
        <AppLayoutInner />
      </Authenticated>
    </>
  );
}