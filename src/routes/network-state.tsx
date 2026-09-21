import { createFileRoute } from "@tanstack/react-router";
import { NetworkStatePage } from "@/pages/NetworkStatePage";

export const Route = createFileRoute("/network-state")({ component: NetworkStatePage });
