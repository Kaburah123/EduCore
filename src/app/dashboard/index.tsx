import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navigate } from "react-router";

export default function DashboardIndex() {
  const user = useQuery(api.users.getCurrentUser, {});

  if (user === undefined) return null;

  switch (user?.role) {
    case "teacher": return <Navigate to="/dashboard/teacher" replace />;
    case "student": return <Navigate to="/dashboard/student" replace />;
    case "parent": return <Navigate to="/dashboard/parent" replace />;
    default: return <Navigate to="/dashboard/admin" replace />;
  }
}