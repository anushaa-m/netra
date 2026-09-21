import { createFileRoute } from "@tanstack/react-router";
import { ExplainabilityPage } from "@/pages/ExplainabilityPage";

export const Route = createFileRoute("/explainability")({ component: ExplainabilityPage });
