import { createFileRoute } from "@tanstack/react-router";
import { EventTimelinePage } from "@/pages/EventTimelinePage";

export const Route = createFileRoute("/event-timeline")({ component: EventTimelinePage });
