import Image from "next/image";
import { BlobImage } from "@/lib/types";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

const MyImages = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/storage/images`,
    {
      cache: "no-store",
    }
  );
  console.log(response);

  const images: BlobImage[] = await response.json();
  console.log(images);

  return (
    <div className="grid gap-2 p-4 font-sans">
      <h1 className="tracking-tight text-2xl font-semibold ml-1">
        Lista de imagens
      </h1>
      <p className="text-gray-800 tracking-tight ml-1">
        Lista de imagens do sistema
      </p>
      {images.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma imagem encontrada.</p>
      ) : (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((image: BlobImage) => (
            <div
              key={image.url}
              className="grid grid-cols-3 max-w-sm border rounded border-gray-300 hover:shadow-lg transition-shadow p-0.5"
            >
              <div className="relative w-full">
                <Image
                  src={image.url}
                  alt={image.pathname}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded"
                />
              </div>
              <div className="flex flex-col py-2 px-4 col-span-2">
                <p
                  className="font-medium text-sm truncate"
                  title={image.pathname}
                >
                  {image.pathname}
                </p>
                <p className="flex items-center gap-2 text-xs mt-1">
                  {new Date(image.uploadedAt).toLocaleDateString("pt-BR")}{" "}
                  <span className="text-gray-500 border tabular-nums text-[0.8em] px-1 rounded-full">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </p>

                <div className="flex mt-6 text-xs gap-2 place-content-end">
                  <Link
                    href={image.url}
                    target="_blank"
                    className="border rounded px-2 py-1 bg-white border-gray-400 hover:border-gray-600 cursor-pointer"
                  >
                    Visualizar
                  </Link>
                  <button className="border rounded px-2 py-1 bg-white border-gray-400 hover:border-gray-600 cursor-pointer">
                    <Trash2Icon size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImages;
