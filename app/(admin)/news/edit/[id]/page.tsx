import EditNewsView from "@/views/news/edit";

export default async function EditNewsPage() {
  let news: News[] = [];

  try {
    const res = await fetch("https://tanusoft.tanuweb.cloud/api/v1/news", {
      cache: "no-store",
    });   

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }

    const data = await res.json();
    news = data.data;
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <>
      <EditNewsView />
    </>
  );
}
