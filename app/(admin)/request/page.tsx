import RequestList from "@/views/request/RequestList";

export default async function AdminBookPage() {
  let request = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/request", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    request = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <RequestList request={request} />
    </>
  );
}
