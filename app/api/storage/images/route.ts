import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    const { blobs } = await list();

    // Filter only image files
    const images = blobs.filter((blob) =>
      blob.pathname.match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Não foi possível listar as imagens. Erro: " + error },
      { status: 500 }
    );
  }
}
