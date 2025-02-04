"use client";
import React from "react";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import { Edit, Eye, Trash } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface Props {
  project: Project[];
}

const List = ({ project }: Props) => {
  const handleDelete = (id: string) => {
    if (typeof window !== undefined) {
      if (window.confirm("Та устгахдаа итгэлтэй байна уу")) {
        axios
          .delete("https://tanusoft.tanuweb.cloud/api/v1/project/" + id)
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
      <div className="w-full border-b-[#e5e5e5] border-b h-20 bg-white flex items-center justify-between px-10  top-0 z-0">
        <span className="text-[#162C43] text-lg">Төслийн жагсаалт</span>
        <Link
          href={"/project/add"}
          className="px-4 py-2 rounded text-white bg-[#3749E5] cursor-pointer hover:bg-opacity-80 transition-all duration-300"
        >
          Төсөл  нэмэх
        </Link>
      </div>
      <div className="flex flex-col gap-4 w-full p-10">
        <div className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-[#e5e5e5]">
          <div className="flex flex-col text-[#162C43]">
            <span className="text-sm text-[#162C43] font-light">
              Нийт Төсөл
            </span>
            <span className="font-semibold">{project.length}</span>
          </div>
        </div>

        <div className="w-full bg-white border p-4 rounded-lg">
          <table className="text-[#162C43] rounded-lg w-full">
            <thead className="bg-[#FAFAFA] rounded-lg  w-full ">
              <th className="w-[10%]  text-center py-4 px-4 text-sm font-light">
                Д/д
              </th>
              <th className="w-[40%] text-start py-4 px-4 text-sm font-light">
                Нэр
              </th>
              <th className="w-[20%] text-start py-4 px-4 text-sm font-light mr04">
                Тайлбар
              </th>
              <th className="w-[30%] text-start py-4 px-4 text-sm font-light">
                Үйлдэл
              </th>
            </thead>
            <tbody>
              {project.map((list, index) => {
                return (
                  <tr className="">
                    <td className="text-sm text-center py-4 ">{index + 1}</td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <img
                          src={
                            "https://tanusoft.tanuweb.cloud/uploads/" +
                            list?.cover
                          }
                          alt=""
                          className="w-8 aspect-square bg-[#CEEEEE] rounded"
                        />
                        <span className="text-xs line-clamp-1">
                          {list?.title}
                        </span>
                      </div>
                    </td>
                    <td className="text-xs lg:text-sm text-start py-2 lg:py-4 line-clamp-2">
                    {list.description}
                    </td>

                    <td>
                      <div className="flex items-center gap-4">
                        <Link href={"/project/edit/" + list._id}>
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
                          onClick={() => {
                            handleDelete(list?._id!);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default List;