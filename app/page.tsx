"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface FileWithPreview extends File {
  preview: string;
  width?: number;
  height?: number;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log(files);

    if (files) {
      const fileArray = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      const filesWithPreview = await Promise.all(
        fileArray.map((file) => {
          return new Promise<FileWithPreview>((resolve) => {
            const preview = URL.createObjectURL(file);
            const img = new window.Image();

            img.onload = () => {
              resolve(
                Object.assign(file, {
                  preview,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                })
              );
            };

            img.src = preview;
          });
        })
      );

      setSelectedFiles(filesWithPreview);
    }
  };

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  return (
    <div className="mx-auto max-w-lg my-4 p-6 flex flex-col gap-4 rounded-md border border-gray-300">
      <h1 className="text-2xl font-semibold tracking-tight">
        Image React App 🖼️{" "}
      </h1>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="px-2 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded cursor-pointer"
        accept="image/*"
        multiple
      />

      <div className="grid grid-cols-3 gap-4">
        {selectedFiles.length > 0 ? (
          selectedFiles.map((file) => (
            <div
              className="rounded outline-1 outline-gray-200 hover:outline-gray-400 hover:cursor-pointer outline-offset-2"
              key={file.name}
            >
              <div
                id="image-container"
                className="relative aspect-square overflow-hidden rounded"
              >
                <Image
                  className="object-cover"
                  src={file.preview}
                  alt={file.name}
                  fill
                />
              </div>
              <p className="text-gray-500 text-sm tracking-tight p-1 text-nowrap overflow-hidden text-ellipsis">
                {file.name}
                {file.width && file.height && (
                  <span className="text-gray-400 text-xs block">
                    {file.width} × {file.height}
                  </span>
                )}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm ml-1 col-span-3">
            Selecione uma imagem...
          </p>
        )}
      </div>
    </div>
  );
}
