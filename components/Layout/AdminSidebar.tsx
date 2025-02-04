"use client";
import IMGURL from "@/constants/Constants";
import { Additional } from "@/types/additional";
import axios from "axios";
import {
  Home,
  Image,
  PanelsTopLeft ,
  BriefcaseBusiness ,
  Settings,
  ListCheck,
  Menu,
  Building2 ,
  X,
  Users ,
  Newspaper ,
  LogOut,
  BringToFront,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminSidebar() {
  const [additional, setAdditional] = useState<Additional | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchAdditional = async () => {
      try {
        const res = await axios.get(
          "https://tanusoft.tanuweb.cloud/api/v1/additional"
        );
        setAdditional(res.data.data);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchAdditional();
  }, []);

  const navLinks = [
    {
      title: "Нүүр хуудас",
      icon: <Home color="#000000" />,
      path: "https://www.tanusoft.mn/",
    },
    {
      title: "Хүсэлт",
      icon: <BringToFront color="#000000" />,
      path: "/request",
    },
   
    {
      title: "Баннер",
      icon: <Image color="#000000" />,
      path: "/banner",
    },
    {
      title: "Төсөл",
      icon: <PanelsTopLeft color="#000000" />,
      path: "/project",
    },
    {
      title: "Баг",
      icon: <Users  color="#000000" />,
      path: "/team",
    },
    {
      title: "Хамтрагч байгууллага",
      icon: <Building2  color="#000000" />,
      path: "/partner",
    },
    {
      title: "Үйлчилгээ",
      icon: <ListCheck color="#000000" />,
      path: "/service",
    },
    {
      title: "Мэдээ мэдээлэл",
      icon: <Newspaper color="#000000" />,
      path: "/news",
    },
    {
      title: "Ажлын байр",
      icon: <BriefcaseBusiness  color="#000000" />,
      path: "/workplace",
    },
    
    {
      title: "Тохиргоо ",
      icon: <Settings color="#000000" />,
      path: "/additional",
    },

    {
      title: "Гарах",
      icon: <LogOut color="#000000" />,
      path: "/login",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu - Visible only on small screens */}
      <div className="md:hidden block bg-gray-100 z-20 fixed top-0 w-full">
        {/* Top Bar with Logo and Toggle Button */}
        <div className="flex justify-between items-center px-4 py-3">
          <img
            src={IMGURL + additional?.logo}
            alt="logo"
            className="rounded w-16 aspect-square object-cover"
          />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-black focus:outline-none"
          >
            {isSidebarOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Sidebar Navigation Links - Visible only when the sidebar is open */}
        {isSidebarOpen && (
          <div className="flex flex-col bg-gray-100 mt-2">
            {navLinks.map((list, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-1 cursor-pointer"
                onClick={() => {
                  setIsSidebarOpen(false);
                  router.push(list.path);
                }}
              >
                <div
                  className={`w-12 h-12 rounded-lg border-[#E5E5E5] bg-white border flex items-center justify-center ${
                    path.includes(list.path) ? "border-[#3749E5] font-bold" : ""
                  }`}
                >
                  {list.icon}
                </div>
                <span
                  className={`text-sm text-[#000000] ${
                    path.includes(list.path) ? "text-[#3749E5] font-bold" : ""
                  }`}
                >
                  {list.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar - Visible only on larger screens */}
      <div className={`hidden md:block`}>
        <div
          className={`fixed top-0 z-50 h-screen bg-[#F8F8F8]  w-64 border-r border-[#E5E5E5] flex flex-col items-center overflow-auto`}
        >
          <div className="flex items-center justify-between mb-6 ">
            {/* <img
              src={IMGURL + additional?.logo}
              alt="logo"
              className="rounded w-20 aspect-square object-cover"
            /> */}
            <h1 className="text-xl font-semibold mt-4 mr-20">
              {additional?.company || "Company Name"}
            </h1>
          </div>
          {navLinks.map((list, index) => (
            <div
              key={index}
              className="flex items-center w-full gap-2 justify-start px-4  cursor-pointer"
              onClick={() => {
                setIsSidebarOpen(false);
                router.push(list.path);
              }}
            >
              <div
                className={`w-12 h-12 rounded-lg border-[#E5E5E5] bg-white border my-1 flex items-center justify-center ${
                  path.includes(list.path) ? "border-[#3749E5] font-bold" : ""
                }`}
              >
                {list.icon}
              </div>
              <span
                className={`text-xs text-[#000000] ${
                  path.includes(list.path) ? "text-[#3749E5] font-bold" : ""
                }`}
              >
                {list.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
