import { createFileRoute } from "@tanstack/react-router";
import { SystemHealthPage } from "@/pages/SystemHealthPage";

export const Route = createFileRoute("/system-health")({ component: SystemHealthPage });
