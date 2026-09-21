import { FeatureImportanceChart } from "@/charts/FeatureImportanceChart";
import { KindTag } from "@/components/shared/KindTag";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTelemetry } from "@/data/useTelemetry";
import { cn } from "@/utils/cn";

export function ExplainabilityPage() {
  const { explainability } = useTelemetry();
  const maxW = Math.max(...explainability.attention.map((a) => a.weight), 0.01);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Explainability"
        title="Why is the risk increasing?"
        subtitle={explainability.explanation}
      />

      <Tabs defaultValue="features">
        <TabsList>
          <TabsTrigger value="features">Feature Contribution</TabsTrigger>
          <TabsTrigger value="attention">Attention / Temporal Importance</TabsTrigger>
          <TabsTrigger value="behaviour">Behavioural Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="mt-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Feature contribution</CardTitle>
                <CardDesc>
                  Relative weight of observed behavioural characteristics associated with the predicted risk trajectory.
                </CardDesc>
              </div>
            </CardHeader>
            <FeatureImportanceChart features={explainability.features} />
          </Card>
        </TabsContent>

        <TabsContent value="attention" className="mt-4">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Temporal attention</CardTitle>
                <CardDesc>Which state windows most influence the current forecast.</CardDesc>
              </div>
            </CardHeader>
            <div className="flex items-end gap-2">
              {explainability.attention.map((a) => (
                <div key={a.window} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end rounded-md bg-bg-elevated px-1 pb-1">
                    <div
                      className={cn(
                        "w-full rounded-sm",
                        a.kind === "observed" ? "bg-observed" : "bg-predicted",
                        a.kind === "predicted" && "opacity-80",
                      )}
                      style={{ height: `${(a.weight / maxW) * 100}%` }}
                    />
                  </div>
                  <div className="text-[0.625rem] text-muted">{a.window}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              Solid observed windows versus dashed-style predicted windows (cyan). Peak attention sits on S(t) and the near forecast.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="behaviour" className="mt-4">
          <div className="grid gap-3 md:grid-cols-2">
            {explainability.indicators.map((ind) => (
              <Card key={ind.id}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <CardTitle>{ind.title}</CardTitle>
                  <KindTag kind={ind.kind} />
                </div>
                <p className="text-sm leading-relaxed text-muted">{ind.detail}</p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
