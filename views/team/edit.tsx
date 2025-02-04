"use client";
import React, { useEffect, useState } from "react";
import { CircleAlert, Trash } from "lucide-react";
import axios from "axios";
import ImageUploader from "@/components/Layout/ImageUploader";
import { useRouter, useParams } from "next/navigation";

export interface Team {
  name: string;
  role: string;
  facebook: string;
  instagram: string;
  viber: string;
  telagram: string;
  profile: string | null;
}

const Edit = () => {
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Team >({
    name: "",
    role: "",
    facebook: "",
    instagram: "",
    viber: "",
    telagram: "",
    profile: "",
  });

  const [profile, setProfile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://tanusoft.tanuweb.cloud/api/v1/team/${id}`)
        .then((res) => {
          const teamData = res.data.data;
          setSingle(teamData);
          setForm({
            name: teamData.name || "",
            role: teamData.role || "",
            facebook: teamData.facebook || "",
            instagram: teamData.instagram || "",
            viber: teamData.viber || "",
            telagram: teamData.telagram || "",
            profile: teamData.profile || "",
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
    setProfile(file);
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("facebook", form.facebook);
    formData.append("instagram", form.instagram);
    formData.append("viber", form.viber);
    formData.append("telagram", form.telagram);
    if (profile) {
      formData.append("file", profile);
    }

    axios
      .put(`https://tanusoft.tanuweb.cloud/api/v1/team/${id}`, formData)
      .then(() => {
        alert("Team member updated successfully!");
        router.push("/team");
      })
      .catch((err) => {
        console.error("Error updating team member:", err);
        alert("Failed to update team member.");
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
              {form.profile ? (
                <div className="relative">
                  <div
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg cursor-pointer"
                    onClick={() => {
                      setForm({
                        ...form,
                        profile: null,
                      });
                    }}
                  >
                    <Trash />
                  </div>
                  <img
                      src={
                        "https://tanusoft.tanuweb.cloud/uploads/" +
                        form?.profile
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
                Ажилтны мэдээлэл
              </span> 
            </div>
            <hr />
            <div className="w-full p-4 space-x-4 flex items-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Ажилтны нэр
                </span>
                <input
                  type="text"
                  name="name" 
                  value={form.name}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Жишээ: Батболд"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Ажилтны үүрэг
                </span>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white max-w-full "
                  placeholder="Жишээ: Захирал"
                />
              </div>
            </div>
            <div className="w-full p-4 space-x-4 flex items-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Facebook
                </span>
                <input
                  type="text"
                  name="facebook" 
                  value={form.facebook}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Жишээ: Батболд"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Instagram
                </span>
                <input
                  name="instagram"
                  value={form.instagram}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white max-w-full "
                  placeholder="Жишээ: Захирал"
                />
              </div>
            </div>
            <div className="w-full p-4 space-x-4 flex items-center">
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Viber
                </span>
                <input
                  type="text"
                  name="viber" 
                  value={form.viber}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded max-w-full text-[#162c43] bg-white"
                  placeholder="Жишээ: Батболд"
                />
              </div>
              <div className="flex flex-col w-full lg:w-[50%]">
                <span className="text-xs lg:text-sm text-[#162c43]">
                  Telagram
                </span>
                <input
                  name="telagramw"
                  value={form.telagram}
                  onChange={handleFormValue}
                  className="border py-2 text-xs lg:text-sm px-4 rounded text-[#162c43] bg-white max-w-full "
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
