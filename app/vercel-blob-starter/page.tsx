"use client";

import { useState, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { upload } from "@vercel/blob/client";
import Image from "next/image";
import Link from "next/link";

const VercelBlob = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function reset() {
    setIsUploading(false);
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setProgress(0);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    if (file) {
      try {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage);
          },
        });

        toast(
          (t) => (
            <span className="text-sm font-sans flex flex-col gap-2">
              <div>
                Imagem enviada com <b>sucesso</b>.
              </div>
              <div className="flex gap-2">
                <Link
                  className="p-1 cursor-pointer border rounded bg-blue-200 border-blue-300 hover:border-blue-400"
                  href={blob.url}
                  target="_blank"
                >
                  Visualizar
                </Link>
                <button
                  className="p-1 cursor-pointer border rounded bg-gray-50 border-gray-200 hover:border-gray-300"
                  onClick={() => toast.dismiss(t.id)}
                >
                  Fechar
                </button>
              </div>
            </span>
          ),
          { duration: 5000 }
        );
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          throw error;
        }
      }
      reset();
    }
  }

  function handleFileChange(file: File) {
    if (file.type.split("/")[0] !== "image") {
      toast.error(
        "Só é permitido o upload de imagens (ex. .jpg, .png e outros"
      );
      return;
    }

    if (file.size / 1024 / 1024 > 10) {
      toast.error(
        "A imagem é muito grande, o tamanho máximo permitido é 10MB."
      );
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <main className="flex min-h-screen flex-col justify-center gap-6 max-w-lg mx-auto font-mono p-4">
      <Toaster />
      <h1 className="font-semibold text-center text-4xl">Vercel Blob</h1>
      <div className="border p-4 rounded border-gray-200 flex flex-col w-full gap-2">
        <h2 className="font-medium text-xl ml-1">Upload an image</h2>
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <input
            id="image-upload"
            name="image-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.currentTarget?.files?.[0];
              if (file) {
                handleFileChange(file);
              }
            }}
          />

          <label htmlFor="image-upload" className="cursor-pointer rounded flex">
            <div className="my-2 px-2 py-1 border-2  border-blue-600 cursor-pointer bg-blue-600 text-white rounded hover:border-blue-800">
              Selecionar Imagem
            </div>
          </label>

          {/* CONTAINER PARA O UPLOADER*/}
          <div
            className="bg-gray-100 aspect-video rounded border border-gray-300 relative"
            id="uploader-container"
          >
            {preview && (
              <Image
                src={preview}
                alt={preview}
                className="h-full w-full rounded object-cover"
                fill
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            {/* PROGRESS BAR PARA O UPLOADER */}

            <div className="" id="uploader-progress">
              {isUploading && (
                <div className="">
                  <div className="flex h-2 overflow-hidden text-xs bg-blue-200 rounded">
                    <div
                      style={{ width: `${progress}%` }}
                      className="flex flex-col justify-center text-center text-white bg-blue-500 shadow-none whitespace-nowrap transition-all duration-500 ease-in-out"
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isUploading || !file}
              className="px-2 py-1 border  border-gray-300 cursor-pointer bg-white rounded hover:border-gray-500 text-foreground disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:border-gray-300"
            >
              Upload
            </button>
            <button
              type="reset"
              onClick={reset}
              disabled={isUploading || !file}
              className="px-2 py-1 border  border-gray-300 cursor-pointer bg-white rounded hover:border-gray-500 text-foreground disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:border-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <div className="border p-4 rounded border-gray-200 flex flex-col w-full gap-2">
        <h2>Imagens</h2>
      </div>
      <div className="">
        <p className="text-center">
          Vercel Blob demo. Built with Next.js App Router
        </p>
      </div>
    </main>
  );
};

export default VercelBlob;
