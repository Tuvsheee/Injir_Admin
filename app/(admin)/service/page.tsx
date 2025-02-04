import List from "@/views/service/list";

export default async function AdminServicePage() {
  let service: Service[] = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/service", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    service = data.data;
  } catch (error) {
    console.error("Error fetching service:", error);
  }

  return (
    <>
      <List service={service} />
    </>
  );
}
