"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert } from "lucide-react";
import Toggle from "react-toggle";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Services } from "@/types/services";
import dynamic from "next/dynamic";
import { Spinner } from "flowbite-react";
import { Destination } from "@/types/destination";

const Froala = dynamic(() => import("@/components/Layout/Froala"), {
  ssr: false,
});

const TravelGallery = dynamic(
  () => import("@/components/Layout/TravelGallery"),
  {
    ssr: false,
  }
);

const ImageUploader = dynamic(
  () => import("@/components/Layout/ImageUploader"),
  {
    ssr: false,
  }
);


const TravelView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [editorValue, setEditorValue] = useState<string>("");
  const [cover, setCover] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const [code, setCode] = useState("");



  const [isSpecial, setIsSpecial] = useState<boolean>(false);

  const handleToggle = () => {
    setIsSpecial(!isSpecial);
  };

  const [form, setForm] = useState({
    title: "",
  });





  const handleFormValue = (e: any) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEditorChange = (text: string) => {
    setEditorValue(text);
  };

  const handleFileChange = (file: File[]) => {
    setFiles(file);
  };

  const handleSingleFileChange = (file: File | null) => {
    setCover(file);
  };

  const validateForm = () => {
    let errors = [];
    if (!form.title) errors.push("Аялалын нэр оруулах шаардлагатай.");
    if (!editorValue) errors.push("Тайлбар оруулах шаардлагатай.");
    if (files.length < 5) errors.push("Та дор хаяж 5 зураг оруулна уу.");
    if (errors.length > 0) {
      alert("Дараах алдаануудыг засна уу:\n" + errors.join("\n"));
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", editorValue);
    files.forEach((file: any) => {
      formData.append("files", file);
    });

    if (cover) {
      formData.append("cover", cover);
    }

    axios
      .post("https://tanusoft.tanuweb.cloud/api/v1/news/", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/news");
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false));
  };





  return (
    <>
      {/* Form UI */}
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-[#162C43] text-lg">Мэдээ нэмэх</span>
        <div
          className="px-4 py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
          aria-disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Илгээх"}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full p-4 lg:p-10">
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Зураг</span>
            </div>
            <hr />
            <div className="p-4 w-full">
              <TravelGallery onChange={handleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs text-[#162c43] w-full">
                Та дор хаяж 5 зураг оруулна уу (Зурагын хэмжээ 5 mb - ээс
                хэтрэхгүй байх ёстой. )
              </span>
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Ковер зураг</span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader onFileChange={handleSingleFileChange} />
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white ">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Тохиргоо</span>
            </div>
            <hr />
            <div className="flex gap-2 items-center justify-between w-full p-4">
              <span className="text-xs text-[#162c43]">Онцлох  эсэх</span>
              <Toggle
                id="cheese-status"
                defaultChecked={isSpecial}
                onChange={handleToggle}
              />
            </div>

          </div>


        </div>

        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Ерөнхий мэдээлэл</span>
            </div>
            <hr />
            <div className="w-full p-4 flex flex-wrap">
              <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                <span className="text-xs text-[#162c43]">Гарчиг</span>
                <input
                  type="text" 
                  name="title"
                  value={form.title}
                  onChange={handleFormValue}
                  className="border py-2 text-xs px-4 rounded text-[#162c43]"
                  placeholder="Хөвсгөлийн тайга,цаатангийн аялал г.м"
                />
              </div>
            </div>
          </div>

          <div className="w-full border border-[#E5E5E5] flex flex-col rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Тайлбар</span>
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

export default TravelView;