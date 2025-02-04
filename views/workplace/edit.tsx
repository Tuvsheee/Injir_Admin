"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert, Trash } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter, useParams } from "next/navigation";

export interface Work {
  title: string;
  description: string;
  cover: string | null;
}

const Edit = () => {
  const [single, setSingle] = useState<Work | null>(null);
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Work>({
    title: "",
    description: "",
    cover: null,
  });

  const [coverphoto, setCover] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://tanusoft.tanuweb.cloud/api/v1/work/${id}`)
        .then((res) => {
          const teamData = res.data.data;
          setSingle(teamData);
          setForm({
            title: teamData.title || "",
            description: teamData.description || "",
            cover: teamData.cover || null,
          });
        })
        .catch((err) => {
          console.error("Error fetching team member:", err);
          alert("Failed to load team member data.");
        });
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (coverphoto) {
      formData.append("file", coverphoto);
    }

    axios
      .put(`https://tanusoft.tanuweb.cloud/api/v1/work/${id}`, formData)
      .then(() => {
        alert("Updated successfully!");
        router.push("/workplace");
      })
      .catch((err) => {
        console.error("Error updating workplace:", err);
        alert("Failed to update workplace.");
      });
  };

  return (
    <>
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">Ажилтан засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Section) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
                Ажилтны зураг
              </span>
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
                      "https://tanusoft.tanuweb.cloud/uploads/" + form.cover
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
              <span className="text-xs lg:text-sm text-[#162c43]">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Form Section) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
                Ажлын байрны мэдээлэл
              </span>
            </div>
            <hr />
            <div className="w-full p-4 space-y-4 flex-row items-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Ажлын байрны нэр
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Жишээ: Батболд"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Тайлбар
                </span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormValue}
                  className="border py-2 text-xs pb-24 lg:text-sm px-4 rounded text-[#162c43] bg-white w-full overflow-x-auto "
                  placeholder="Жишээ: Захирал"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
