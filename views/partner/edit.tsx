"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert, Trash } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export interface Partner {
  name: string;
  description: string;
  logo: string | null;
}


const PartnerEdit = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState< Partner>({
    name: "",
    description: "",
    logo: "",
  });

  // Fetch data when the component mounts or 'id' changes
  useEffect(() => {
    if (id) {
      axios
        .get(`https://tanusoft.tanuweb.cloud/api/v1/partner/${id}`)
        .then((res) => {
          const tipData = res.data.data;
          setSingle(tipData);
          setForm({
            name: tipData.name,
            description: tipData.description,
            logo: tipData.logo,
          });
        })
        .catch((err) => console.error("Error fetching tip:", err));
    }
  }, [id]);

  const handleFormValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      .put(`https://tanusoft.tanuweb.cloud/api/v1/partner/${id}`, formData)
      .then((res) => {
        alert("Partner updated successfully!");
        router.push("/partner");
      })
      .catch((err) => console.error("Error updating partner:", err));
  };

  return (
    <>
      {/* Header */}
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">Байгууллага засах</span>
        <div
          className="px-4 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
          onClick={onSubmit}
        >
          Илгээх
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        {/* Left Column (Image Section) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white pb-4">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Байгууллагийн зураг</span>
            </div>
            <hr />
            <div className="w-full">
            {form.logo ? (
                <div className="relative">
                  <div
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg cursor-pointer"
                    onClick={() => {
                      setForm({
                        ...form,
                        logo: null,
                      });
                    }}
                  >
                    <Trash />
                  </div>
                  <img
                      src={
                        "https://tanusoft.tanuweb.cloud/uploads/" +
                        form?.logo
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
              <span className="text-xs text-[#162c43]">
                (Зурагын хэмжээ 5 mb - ээс хэтрэхгүй байх ёстой.)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Form Section) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-4">
          <div className="w-full border border-[#E5E5E5] rounded-lg bg-white">
            <div className="w-full px-4 py-4">
              <span className="text-[#162C43]">Байгууллагийн мэдээлэл </span>
            </div>
            <hr />
            <div className="w-full">
              <div className="flex flex-col lg:flex-row w-full p-4">
                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                  Байгууллагийн нэр
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-[50%] p-4">
                  <span className="text-xs lg:text-sm text-[#162c43]">
                     Тайлбар
                  </span>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleFormValue}
                    className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white"
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

export default PartnerEdit
