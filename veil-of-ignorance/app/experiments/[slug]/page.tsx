import ExperimentDetail from "@/app/components/ExperimentDetail";
export default function ExperimentPage({ params }: { params: { slug: string } }) {
  return <ExperimentDetail slug={params.slug} />;
}
