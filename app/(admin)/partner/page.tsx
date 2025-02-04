import PartnerList from "@/views/partner/list";

export default async function AdminPartnerPage() {
  let partner = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/partner/", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    partner = data.data;
  } catch (error) {
    console.error("Error fetching travels:", error);
  }

  return (
    <>
      <PartnerList partner={partner} />
    </>
  );
}
