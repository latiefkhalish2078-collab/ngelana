
import { getPublishedDestinations } from "@/features/destinations/queries";
import ExploreSection from "@/features/destinations/explore-section";

export async function PublishedDestinations() {
  const { error } = await getPublishedDestinations();

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-8">
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </p>
      </section>
    );
  }

  return <ExploreSection />;
}
