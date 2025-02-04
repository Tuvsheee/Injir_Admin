"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert, Trash } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter, useParams } from "next/navigation";
import Toggle from "react-toggle";

export interface Project {
  title: string;
  description: string;
  isLink: boolean;
  link: string;
  cover: string | null;
}

const Edit = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState<Project>({
    title: "",
    description: "",
    isLink: false,
    link: "",
    cover: "",
  });
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://tanusoft.tanuweb.cloud/api/v1/project/${id}`)
        .then((res) => {
          const projectData = res.data.data;
          setSingle(projectData);
          setForm({
            title: projectData.title || "",
            description: projectData.description || "",
            isLink: projectData.isLink || false,
            link: projectData.link || "",
            cover: projectData.cover || "",
          });
        })
        .catch((err) => console.error("Error fetching project data:", err));
    }
  }, [id]);

  const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const handleToggle = () => {
    setForm((prevForm) => ({
      ...prevForm,
      isLink: !prevForm.isLink,
    }));
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("isLink", JSON.stringify(form.isLink));
    formData.append("link", form.link);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .put(`https://tanusoft.tanuweb.cloud/api/v1/project/${id}`, formData)
      .then(() => {
        alert("Project updated successfully!");
        router.push("/project");
      })
      .catch((err) => console.error("Error updating project:", err));
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Төсөл засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        {/* Left Column - Image Upload */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Төслийн зураг</span>
            </div>
            <hr />
            <div className="w-full">
              {form.cover ? (
                <div className="relative">
                  <div
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg cursor-pointer"
                    onClick={() => {
                      setForm({
                        ...form,
                        cover: null,
                      });
                    }}
                  >
                    <Trash />
                  </div>
                  <img
                    src={
                      "https://tanusoft.tanuweb.cloud/uploads/" + form?.cover
                    }
                    alt="Төсөл"
                    className="w-full aspect-square"
                  />
                </div>
              ) : (
                <ImageUploader isSquare onFileChange={handleSingleFileChange} />
              )}
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Төслийн тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">Линк рүү үсрэх эсэх</span>
              <Toggle
                id="toggle-link"
                checked={form.isLink}
                onChange={handleToggle}
              />
            </div>
            {form.isLink && (
              <div className="flex flex-col gap-2 w-full p-4">
                <span className="text-xs text-[#162c43]">Үсрэх линк</span>
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="https://facebook.com г.м"
                />
              </div>
            )}
            {!form.isLink && form.link && (
              <div className="flex flex-col gap-2 w-full p-4">
                <span className="text-xs text-[#162c43]">Үсрэх линк</span>
                <input
                  type="text"
                  name="link"
                  value={form.link}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="https://facebook.com г.м"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Төслийн мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="w-full p-4 flex items-center">
                <div className="flex flex-col gap-2 w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Нэр</span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="Хангайн аялал г.м"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Тайлбар</span>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="Travel to Khangai, etc."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
