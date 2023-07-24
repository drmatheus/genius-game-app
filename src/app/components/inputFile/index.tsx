/* eslint-disable @next/next/no-img-element */
import { api } from "@/app/services";
import React, { useState, ChangeEvent } from "react";
import { FieldError, UseFormSetValue } from "react-hook-form";
import noPicture from "../../assets/images/noPicture.jpg";

type TPInput = {
  label: string;
  type: string;
  error?: FieldError | undefined;
  register: any;
  defaulfValue?: string;
  className?: string;
  registerName?: string;
  setValue: UseFormSetValue<any>;
};

export const FileInput = ({ label, setValue, register }: TPInput) => {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length == 1) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);
      const { data: photoData } = await api.post("/users/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setValue("picture", photoData.location);
      setSelectedFileName(photoData.location);
    } else {
      setSelectedFileName("");
    }
  };

  return (
    <div className=" flex justify-between relative w-full  h-20 rounded">
      {selectedFileName && (
        <img
          className=" max-w-[5rem] aspect-square rounded-lg "
          alt="Selecione uma imagem"
          src={selectedFileName}
        />
      )}
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
      />
      <label
        className=" bg-green-800 h-8 rounded w-fit p-2 pt-1 mt-auto ml-auto "
        htmlFor="file-upload"
      >
        {label}
      </label>
      <input className="hidden" type="text" {...register("picture")} />
    </div>
  );
};
