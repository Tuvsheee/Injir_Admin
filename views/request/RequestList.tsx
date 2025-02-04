"use client";
import React from "react";
import { Trash } from "lucide-react";
import axios from "axios";
import { Request } from "@/types/request";
import { useRequestStore } from "@/store/requestStore";

interface Props {
  request: Request[];
}

const RequestList = ({ request }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("https://tanusoft.tanuweb.cloud/api/v1/request/" + id)
          .then(() => {
            alert("Амжилттай устгагдлаа");
            window.location.reload();
          })
          .catch(() => alert("Алдаа гарлаа"));
      }
    }
  };
  const { updateStatus } = useRequestStore();

  return (
    <>
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center px-4 md:px-10 justify-between">
        <span className="text-[#162C43] text-sm lg:text-lg">
          Захиалгийн жагсаалт
        </span>
      </div>

      <div className="flex flex-col gap-4 w-full px-4 py-4 lg:px-10 lg:py-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-xs lg:text-sm font-light">Нийт Захиалга</span>
            <span className="font-semibold text-sm lg:text-lg">
              {request?.length}
            </span>
          </div>
        </div>

        <div className="w-full bg-white border p-4 rounded-lg overflow-x-auto">
          <table className="hidden sm:table text-[#162C43] rounded-lg w-full min-w-[800px]">
            <thead className="bg-[#FAFAFA] rounded-lg">
              <tr>
                <th className="w-[5%] text-center py-4 px-2 text-xs lg:text-sm font-light">
                  Д/д
                </th>
                <th className="w-[10%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Нэр
                </th>
                <th className="w-[10%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  И-мэйл
                </th>
                <th className="w-[10%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Утасны дугаар
                </th>
                <th className="w-[10%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Зурвас
                </th>
                <th className="w-[15%] text-start py-4 px-2 text-xs lg:text-sm font-light">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody>
              {request?.map((list, index) => (
                <tr key={list._id}>
                  <td className="text-xs lg:text-sm text-center py-2 lg:py-4">
                    {index + 1}
                  </td>
                  <td className="text-xs lg:text-sm text-start py-2 lg:py-4">
                    {list.name}
                  </td>
                  <td className="text-xs lg:text-sm text-start py-2 lg:py-4">
                    {list.email}
                  </td>
                  <td className="text-xs lg:text-sm text-start py-2 lg:py-4">
                    {list.phone}
                  </td>
                  <td className="text-xs lg:text-sm text-start py-2 lg:py-4">
                    {list.content}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
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

          {/* Mobile view for booking list */}
          <div className="sm:hidden w-full">
            {request?.map((list, index) => (
              <div
                key={list._id}
                className="bg-white border p-4 rounded-lg mb-4"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-light">№ {index + 1}</span>
                    <h3 className="text-sm font-semibold">{list.name}</h3>
                  </div>
                  <Trash
                    color="red"
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleDelete(list._id)}
                  />
                </div>
                <div className="text-xs mt-2">
                  <p>И-мэйл: {list.email}</p>
                  <p>Утасны дугаар: {list.phone}</p>
                  <p>Зурвас: {list.content || 0}</p>
                  {/* <p>
                    Төлөв:{" "}
                    <select
                      className={`rounded-full p-2 px-1 font-bold ${
                        list.status === 2
                          ? "bg-red-100 text-red-600"
                          : list.status === 1
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                      value={list.status.toString()}
                      onChange={(e) =>
                        updateStatus(list._id, Number(e.target.value))
                      }
                    >
                      <option value="1">Идэвхтэй</option>
                      <option value="2">Идэвхгүй</option>
                      <option value="0">Хүлээгдэж байна</option>
                    </select>
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestList;
