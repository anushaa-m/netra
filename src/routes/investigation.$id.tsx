import { createFileRoute } from "@tanstack/react-router";
import { InvestigationPage } from "@/pages/InvestigationPage";

export const Route = createFileRoute("/investigation/$id")({
  component: InvestigationRoute,
});

function InvestigationRoute() {
  const { id } = Route.useParams();
  return <InvestigationPage id={id} />;
}
