import List from "@/views/workplace/list";

export default async function WorkPlacePage() {
  let work = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/work", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    work = data.data;
  } catch (error) {
    console.error("Error fetching work:", error);
  }

  return (
    <>
      <List work={work} />
    </>
  );
}
