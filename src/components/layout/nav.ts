import {
  Activity,
  Brain,
  GitBranch,
  LayoutDashboard,
  LineChart,
  ScrollText,
  Settings,
  HeartPulse,
} from "lucide-react";

export const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/network-state", label: "Network State", icon: Activity },
  { to: "/threat-forecast", label: "Threat Forecast", icon: LineChart },
  { to: "/attack-progression", label: "Attack Progression", icon: GitBranch },
  { to: "/explainability", label: "Explainability", icon: Brain },
  { to: "/event-timeline", label: "Event Timeline", icon: ScrollText },
  { to: "/system-health", label: "System Health", icon: HeartPulse },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;
