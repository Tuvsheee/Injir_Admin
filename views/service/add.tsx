"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter } from "next/navigation";
import Toggle from "react-toggle";

export interface Service {
  title: string;
  description: string;
  isLink: boolean;
  link: string;
  cover?: string; // Optional
}

const Add = () => {
  const router = useRouter();
  const [form, setForm] = useState<Service>({
    title: "",
    description: "",
    isLink: false,
    link: "",
  });

  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const [cover, setCover] = useState<File | null>(null);

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
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
      .post("https://tanusoft.tanuweb.cloud/api/v1/service/", formData)
      .then((res) => {
        alert("success");
        router.push("/service");
      })
      .catch((er) => console.log(er));
  };

  const handleToggle = () => {
    setForm({
      ...form,
      isLink: !form.isLink,
    });
  };

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-10  top-0 z-0">
        <span className="text-[#162C43] text-lg"> Үйлчилгээ нэмэх</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>
      <div className="flex gap-4 w-full p-10 ">
        <div className="w-[30%] flex flex-col gap-4 ">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Үйлчилгээ зураг</span>
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
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Үйлчилгээний тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">Линк рүү үсрэх эсэх</span>
              <Toggle
                id="cheese-status"
                defaultChecked={form.isLink}
                onChange={handleToggle}
              />
            </div>
            {form.isLink ? (
              <div className="flex flex-col gap-2  w-full p-4">
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
            ) : null}
          </div>
        </div>
        <div className="w-[70%]   flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white ">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Үйлчилгээний мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full">
              <div className="w-full p-4  flex items-center">
                <div className="flex flex-col gap-2  w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Нэр</span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="tanu app etc."
                  />
                </div>
                <div className="flex flex-col gap-2  w-[50%] p-4">
                  <span className="text-xs text-[#162c43]">Тайлбар</span>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder="tanu app etc."
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

export default Add;
