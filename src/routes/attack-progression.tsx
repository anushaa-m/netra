import { createFileRoute } from "@tanstack/react-router";
import { AttackProgressionPage } from "@/pages/AttackProgressionPage";

export const Route = createFileRoute("/attack-progression")({ component: AttackProgressionPage });
