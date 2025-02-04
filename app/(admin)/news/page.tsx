"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import List from "@/views/news/list";

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    axios
      .get("https://tanusoft.tanuweb.cloud/api/v1/news")
      .then((res) => setNews(res.data.data));
  }, []);

  return (
    <>
      <List news={news} />
    </>
  );
}
