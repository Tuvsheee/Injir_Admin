import List from "@/views/project/list";

export default async function AdminProjectPage() {
  let project: Project[] = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/project", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    project = data.data;
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  return (
    <>
      <List project={project} />
    </>
  );
}
