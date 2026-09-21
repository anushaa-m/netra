import { createFileRoute } from "@tanstack/react-router";
import { ThreatForecastPage } from "@/pages/ThreatForecastPage";

export const Route = createFileRoute("/threat-forecast")({ component: ThreatForecastPage });
