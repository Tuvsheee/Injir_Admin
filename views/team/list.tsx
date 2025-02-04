"use client";
import React from "react";
import { Edit, Eye, Trash } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Props {
  team: any[];
}

const TeamList = ({ team }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("https://tanusoft.tanuweb.cloud/api/v1/team/" + id)
          .then(() => {
            alert("Амжилттай устгагдлаа");
            window.location.reload();
          })
          .catch(() => alert("Алдаа гарлаа"));
      }
    }
  };

  return (
    <>
      <div className="w-full border-b border-[#e5e5e5] h-20 bg-white flex items-center justify-between px-4 lg:px-10 top-0 z-0">
        <span className="text-sm lg:text-lg text-[#162C43]">
          Ажилтаны  жагсаалт
        </span>
        <Link
          href="/team/add"
          className="px-3 py-2 rounded bg-[#3749E5] text-white text-xs lg:text-sm cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Ажилтан нэмэх
        </Link>
      </div>

      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm text-[#162C43] font-light">
              Нийт Ажилтан
            </span>
            <span className="font-semibold text-sm lg:text-lg">
              {team?.length}
            </span>
          </div>
        </div>

        {/* Responsive table */}
        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="text-[#162C43] rounded-lg w-full min-w-[600px]">
            <thead className="bg-[#FAFAFA] rounded-lg w-full">
              <tr>
                <th className="w-[10%] text-center py-4 px-2 text-xs lg:text-sm font-light">
                  Д/д
                </th>
                <th className="w-[40%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Ажилтан нэр
                </th>
                <th className="w-[20%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Ажилтан үүрэг
                </th>
                <th className="w-[30%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {team?.map((list, index) => (
                <tr key={list._id} className="space-y-2">
                  <td className="text-xs lg:text-sm text-center py-2 lg:py-4">
                    {index + 1}
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <img
                        src={
                          "https://tanusoft.tanuweb.cloud/uploads/" + list?.profile
                        }
                        alt=""
                        className="w-8 lg:w-10 aspect-square bg-[#CEEEEE] rounded"
                      />
                      <span className="text-xs lg:text-sm line-clamp-1">
                        {list?.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-xs lg:text-sm text-start py-2 lg:py-4">
                    {list.role}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <Link href={`/team/edit/${list._id}`}>
                        <Edit
                          color="orange"
                          size={20}
                          className="cursor-pointer"
                        />
                      </Link>
                      <Trash
                        color="red"
                        size={20}
                        className="cursor-pointer"
                        onClick={() => handleDelete(list._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TeamList;
