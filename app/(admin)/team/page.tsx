import List from "@/views/team/list";

export default async function TeamPage() {
  let team = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/team", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    team = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <List team={team} />
    </>
  );
}
