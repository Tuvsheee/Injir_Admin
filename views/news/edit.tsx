"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Toggle from "react-toggle";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Travel } from "@/types/travel";

const Froala = dynamic(() => import("@/components/Layout/Froala"), {
  ssr: false,
});
const TravelGallery = dynamic(
  () => import("@/components/Layout/TravelGallery"),
  { ssr: false }
);
const ImageUploader = dynamic(
  () => import("@/components/Layout/ImageUploader"),
  { ssr: false }
);

const EditNewsView = () => {
  const router = useRouter();
  const { id } = useParams();
  const [isSpecial, setIsSpecial] = useState(false);
  const [single, setSingle] = useState<Travel | null>(null);
  const [editorValue, setEditorValue] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: "",
  });

  useEffect(() => {
    axios
      .get(`https://tanusoft.tanuweb.cloud/api/v1/news/${id}`)
      .then((res) => {
        const newsData = res.data.data;
        setSingle(newsData);
        setForm(newsData.title || "",);
        setIsSpecial(newsData.isSpecial || false);
        setEditorValue(newsData.description || "");
        setFiles(newsData.files || []);
        setCover(newsData.cover || null);
      })
      .catch((error) => console.error("Error fetching travel data:", error));
  }, [id]);

  const handleToggle = () => setIsSpecial(!isSpecial);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleEditorChange = (text: string) => setEditorValue(text);

  const handleFileChange = (newFiles: File[]) => setFiles(newFiles);

  const handleSingleFileChange = (newCover: File | null) => setCover(newCover);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", editorValue);
    formData.append("isSpecial", JSON.stringify(isSpecial));

    files.forEach((file) => formData.append("files", file));
    if (cover) formData.append("cover", cover);

    axios
      .put(`https://tanusoft.tanuweb.cloud/api/v1/news/${id}`, formData)
      .then(() => {
        alert("Travel updated successfully!");
        router.push("/news");
      })
      .catch((error) => {
        console.error("Error updating travel:", error.response?.data || error);
      });
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Аялал засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Panel */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          {/* Travel Images */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын зураг</span>
            </div>
            <hr />
            <div className="p-4 w-full">
              <TravelGallery onChange={handleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                Та дор хаяж 5 зураг оруулна уу (Зурагын хэмжээ 5 mb - ээс
                хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
 
          {/* Configurations */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">Онцлох аялал эсэх</span>
              <Toggle
                id="cheese-status"
                defaultChecked={isSpecial}
                onChange={handleToggle}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Нэмэлт мэдээлэл</span>
            </div>
            <hr />
          </div>

          {/* Cover Image */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Ковер зураг</span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader onFileChange={handleSingleFileChange} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          {/* Travel General Information */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын ерөнхий мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full p-4 flex flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                <span className="text-xs text-[#162c43]">Аялалын нэр</span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43] bg-white"
                  placeholder="2 өдөр 3 шөнө г.м"
                />
              </div>
            </div>

            <div className="flex gap-2 items-center w-full pb-4 px-8">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                Хямдралгүй үед та 0 гэж оруулна уу
              </span>
            </div>
          </div>

          {/* Travel Description */}
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Аялалын тайлбар</span>
            </div>
            <hr />
            <div className="w-full p-4 text-black">
              <Froala value={editorValue} onValueChange={handleEditorChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNewsView;
