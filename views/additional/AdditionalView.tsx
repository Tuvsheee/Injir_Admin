"use client";
import IMGURL from "@/constants/Constants";
import { Additional } from "@/types/additional";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  additional: Additional;
}

const AdditionalView = ({ additional }: Props) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [form, setForm] = useState<Additional>(additional);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogo(e.target.files ? e.target.files[0] : null);
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCover(e.target.files ? e.target.files[0] : null);
  };

  const onUpdate = () => {
    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    if (cover) formData.append("cover", cover);
    Object.keys(form).forEach((key) => {
      formData.append(key, (form as any)[key]);
    });

    axios
      .put(`https://tanusoft.tanuweb.cloud/api/v1/additional/update`, formData)
      .then(() => {
        alert("Амжилттай хадгалагдлаа");
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full h-20 bg-white shadow flex items-center justify-between px-6 md:px-10">
        <span className="text-[#162C43] text-lg">Сайтын тохиргоо</span>
        <div
          onClick={onUpdate}
          className="px-4 py-2 rounded bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300 text-white"
        >
          <span>Өөрчлөх</span>
        </div>
      </div>
     

      <div className="w-full flex flex-col md:flex-row gap-6 px-6 md:px-10">
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg text-gray-800 mb-4">Үндсэн  мэдээлэл</h2>
            {/* Company information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {[
                {
                  label: "Байгууллагийн нэр",
                  name: "company",
                  placeholder: "Танусофт г.м",
                },
                {
                  label: "Цахим хаяг",
                  name: "email",
                  placeholder: "admin@gmail.com г.м",
                },
                { label: "Утас", name: "phone", placeholder: "77000000 г.м" },
                { label: "Хаяг", name: "address", placeholder: "СБД г.м" },
                {
                  label: "Google Map",
                  name: "googleMap",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Instagram",
                  name: "instagram",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Viber",
                  name: "viber",
                  placeholder: "Линк оруулна уу ?",
                },
                {
                  label: "Whatsapp",
                  name: "whatsapp",
                  placeholder: "Линк оруулна уу ?",
                },
              ].map(({ label, name, placeholder }, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <span className="text-xs text-[#162c43]">{label}</span>
                  <input
                    type="text"
                    name={name}
                    value={(form as any)[name]}
                    onChange={handleChange}
                    className="border py-2 text-xs px-4 rounded text-[#162c43]"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
            {/* Logo Section */}
            <div className="flex-row  items-center gap-4 mt-12 w-full  justify-between">
              <div className="w-full">
                  <input
                    type="file"
                    className="hidden"
                    id="logo"
                    onChange={handleFileChange1}
                  />
                  <label htmlFor="logo">
                    <span className="text-sm border rounded px-4 py-2 cursor-pointer hover:bg-slate-300 transition-all duration-300">
                      Лого солих
                    </span>
                  </label>
                </div>
              <div className="w-full h-20 aspect-square mt-12 bg-gray-300">
                <img
                  src={
                    logo == null
                      ? IMGURL + form.logo
                      : URL.createObjectURL(logo)
                  }
                  alt="logo"
                  className="w-full h-full object-cover "
                />
              </div>
              
            </div>
            {/* Cover Section */}
            <div className="flex-row  items-center gap-4 mt-12 w-full  justify-between">
              <div>
                <input
                  type="file"
                  className="hidden"
                  id="cover"
                  onChange={handleFileChange2}
                />
                <label htmlFor="cover">
                  <span className="text-sm border rounded px-4 py-2 cursor-pointer hover:bg-slate-300 transition-all duration-300">
                    Ковер зураг солих
                  </span> 
                </label>
              </div> 
              <div className="w-full h-[60vh]  aspect-square  mt-12 bg-gray-300">
                <img
                  src={
                    cover == null
                      ? IMGURL + form.cover
                      : URL.createObjectURL(cover)
                  }
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              
            </div>
          </div>


          <div className="w-full md:w-1/3 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg text-gray-800 mb-4">Статистик </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    label: "Бүтээгдэхүүн",
                    name: "product",
                    placeholder: "Бүтээгдэхүүний тоо",
                  },
                  {
                    label: "Хүний нөөц",
                    name: "team",
                    placeholder: "",
                  },
                  {
                    label: "Хамтрагч байгууллага ",
                    name: "partner",
                    placeholder: "20  г.м",
                  },
                  {
                    label: "Хэрэглэгч",
                    name: "user",
                    placeholder: "20  г.м",
                  },
                  {
                    label: "Тайлбар 1",
                    name: "description1",
                    placeholder: "г.м",
                  },
                  {
                    label: "Тайлбар 2",
                    name: "description2",
                    placeholder: "г.м",
                  },
                ].map(({ label, name, placeholder }, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="text-xs text-[#162c43]">{label}</span>
                    {name === "description1" || name === "description2" ? (
                      <textarea
                        name={name}
                        value={(form as any)[name]}
                        onChange={handleChange}
                        className="border py-2 text-xs px-4 rounded text-[#162c43] overflow-auto h-20 resize-none pb-4"
                        placeholder={placeholder}
                      />
                    ) : (
                      <input
                        type="text"
                        name={name}
                        value={(form as any)[name]}
                        onChange={handleChange}
                        className="border py-2 text-xs px-4 rounded text-[#162c43]"
                        placeholder={placeholder}
                      />
                    )}
                  </div>
                ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdditionalView;
