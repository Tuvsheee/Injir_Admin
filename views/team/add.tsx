"use client";
import React, { useState } from "react";
import { CircleAlert } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter } from "next/navigation";

const Add = () => {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    name: "",
    role: "",
    facebook: "",
    instagram: "",
    viber: "",
    telagram: "",
    cover: "",
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
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("facebook", form.facebook);
    formData.append("instagram", form.instagram);
    formData.append("viber", form.viber);
    formData.append("telagram", form.telagram);

    if (cover) {
      formData.append("file", cover);
    }

    axios
      .post("https://tanusoft.tanuweb.cloud/api/v1/team/", formData)
      .then((res) => {
        alert("Амжилттай");
        router.push("/team");
      })
      .catch((er) => console.log(er));
  };

  return (
    <>
      {/* Header Section */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">
          Ажилтан нэмэх 
        </span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Uploader) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
                Ажилтаны зураг
              </span>
            </div>
            <hr />
            <div className="w-full">
              <ImageUploader isSquare onFileChange={handleSingleFileChange} />
            </div>
            <div className="flex gap-2 items-center w-full px-4 pt-4">
              <CircleAlert color="#162c43" />
              <span className="text-xs lg:text-sm text-[#162c43]">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-sm lg:text-base text-[#162C43]">
              Ажилтаны Мэдээлэл
              </span>
            </div>
            <hr />
            <div className="w-full p-4 flex items-center space-x-4 justify-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                Ажилтаны нэр
                </span>
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Бат г.м"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                Ажилтаны үүрэг 
                </span>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Back end developer etc."
                />
              </div>
            </div>
            <div className="w-full p-4 flex items-center space-x-4 justify-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                Facebook хаяг
                </span>
                <input 
                  type="text"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="https://www.facebook.com/"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                Instagram хаяг 
                </span>
                <input
                  type="text"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="https://www.instagram.com/"
                />
              </div>
            </div>
            <div className="w-full p-4 flex items-center space-x-4 justify-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                Viber дугаар
                </span>
                <input 
                  type="text"
                  name="viber"
                  value={form.viber}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="+976 85187868"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Telegram дугаар
                </span>
                <input
                  type="text"
                  name="telagram"
                  value={form.telagram}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="+976 85187868"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
