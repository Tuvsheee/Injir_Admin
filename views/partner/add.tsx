"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter } from "next/navigation";

const PartnerAdd = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    logo: "",
  });

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form, 
      [name]: value,
    });
  };

  const [logo, setLogo] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setLogo(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (logo) {
      formData.append("file", logo);
    }

    axios
      .post("https://tanusoft.tanuweb.cloud/api/v1/partner/", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/partner/");
      })
      .catch((er) => console.log(er));
  };



  return (
    <>
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <div className="text-sm bg-white z-0 lg:text-lg text-[#162C43]">
          Байгууллага нэмэх
        </div>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-xs lg:text-sm"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Байгууллагын зураг</span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader isSquare onFileChange={handleSingleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full p-4">
                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Нэр</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43]"
                    placeholder="Мэдээлэл г.м"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">
                  Тайлбар
                  </span>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4  rounded text-[#162c43]"
                    placeholder="Тайлбар г.м"
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

export default PartnerAdd;
